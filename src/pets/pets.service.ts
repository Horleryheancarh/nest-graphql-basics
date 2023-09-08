import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './pets.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { OwnersService } from 'src/owners/owners.service';
import { Owner } from 'src/owners/entities/owner.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private readonly petsRepository: Repository<Pet>,
    private readonly ownersService: OwnersService,
  ) {}

  async createPet(createPetInput: CreatePetInput): Promise<Pet> {
    // Create New Pet
    const newPet = this.petsRepository.create(createPetInput);

    return this.petsRepository.save(newPet);
  }

  findOne(id: number): Promise<Pet> {
    return this.petsRepository.findOneOrFail({ where: { id } });
  }

  async findAll(): Promise<Pet[]> {
    // SELECT * pet
    return await this.petsRepository.find();
  }

  getOwner(ownerId: number): Promise<Owner> {
    return this.ownersService.findOne(ownerId);
  }
}
