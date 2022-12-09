import { CreateContainerHandlingDto } from './dto/create-container-handling.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContainerHandlingEntity } from './entities/container-handling.entity';
import { UpdateContainerHandlingDto } from './dto/update-container-handling.dto';
import { TableCell, TDocumentDefinitions } from 'pdfmake/interfaces';
import fs from 'fs';
import PdfPrinter from 'pdfmake';
import { Response } from 'express';

@Injectable()
export class ContainerHandlingService {
  constructor(
    @InjectRepository(ContainerHandlingEntity)
    private readonly containerHandlingRepository: Repository<ContainerHandlingEntity>,
  ) {}

  async findAll(): Promise<ContainerHandlingEntity[]> {
    try {
      const containerHandlings = await this.containerHandlingRepository.find();

      return containerHandlings;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { message: 'Não foi possível buscar as movimentações.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: number): Promise<ContainerHandlingEntity> {
    try {
      const containerHandling = await this.containerHandlingRepository.findOne({
        where: { id },
      });
      return containerHandling;
    } catch {
      throw new HttpException(
        { message: 'Não foi possível buscar a movimentação.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create(
    createContainerHandlingDto: CreateContainerHandlingDto,
  ): Promise<ContainerHandlingEntity> {
    try {
      const containerHandlingCreated =
        await this.containerHandlingRepository.save(createContainerHandlingDto);

      return containerHandlingCreated;
    } catch (error) {
      console.log(error);
      if (!!(error instanceof HttpException)) throw error;
      throw new HttpException(
        { message: 'Não foi possível salvar a movimentação.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: number,
    updateContainerDto: UpdateContainerHandlingDto,
  ): Promise<ContainerHandlingEntity> {
    try {
      const containerHandlingUpdated =
        await this.containerHandlingRepository.save(updateContainerDto);

      return containerHandlingUpdated;
    } catch {
      throw new HttpException(
        { message: 'Não foi possível atualizar as movimentações.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      await this.containerHandlingRepository.delete(id);

      return { message: 'Movimentação excluída com sucesso!' };
    } catch {
      throw new HttpException(
        { message: 'Não foi possível deletar a movimentação.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async generateReport(response: Response): Promise<any> {
    const containerHandlings = await this.containerHandlingRepository.find({
      relations: ['container'],
    });

    const pdfFormattedData = containerHandlings.map((item) => {
      const values = Object.values(item);

      //date definitions
      const beginsAtDate = new Date(values[1]).toLocaleDateString('pt-BR');
      const beginsAtHour = new Date(values[1]).toLocaleTimeString('pt-BR');
      const endsAtDate = new Date(values[2]).toLocaleDateString('pt-BR');
      const endsAtHour = new Date(values[2]).toLocaleTimeString('pt-BR');

      const containerCode = item.container.code;

      const data = [
        values[0],
        `${beginsAtDate} ${beginsAtHour}`,
        `${endsAtDate} ${endsAtHour}`,
        containerCode,
      ];

      return data;
    });

    const fonts = {
      Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique',
      },
    };

    const printer = new PdfPrinter(fonts);

    const columnTitles: TableCell[] = [
      {
        text: 'ID',
        style: 'columnsTitle',
      },
      {
        text: 'Início',
        style: 'columnsTitle',
      },
      {
        text: 'Fim',
        style: 'columnsTitle',
      },
      {
        text: 'Cód. Container',
        style: 'columnsTitle',
      },
    ];

    const docDefinitions: TDocumentDefinitions = {
      defaultStyle: { font: 'Helvetica' },
      content: [
        {
          columns: [
            { text: 'Relatório de Movimentações', style: 'header' },
            {
              text: `${new Date().toLocaleDateString(
                'pt-BR',
              )} ${new Date().toLocaleTimeString('pt-BR')}`,
              style: 'header',
            },
          ],
        },
        {
          table: {
            body: [columnTitles, ...pdfFormattedData],
            widths: '*',
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          marginBottom: 15,
        },
        columnsTitle: {
          fontSize: 15,
          bold: true,
          fillColor: '#aeeeee',
          alignment: 'center',
        },
      },
    };
    const pdfDoc = printer.createPdfKitDocument(docDefinitions);
    pdfDoc.pipe(fs.createWriteStream('report.pdf'));

    const chunks = [];

    pdfDoc.on('data', (chunk) => {
      chunks.push(chunk);
    });

    pdfDoc.end();

    pdfDoc.on('end', () => {
      const result = Buffer.concat(chunks);
      response.end(result);
    });
  }
}
