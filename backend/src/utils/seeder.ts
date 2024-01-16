import dotenv from 'dotenv';
import 'app-module-path/register';

import casual from 'casual';
import { program } from 'commander';
import { camelCase, capitalizeWords } from '@/utils/functions';

dotenv.config({ path: `.env.development` });

import userModel from '@/models/users.model';
import roleModel from '@/models/roles.model';

import database from '@databases';

type SchemaFunction = (casualInstance: typeof casual) => any;

export default class Seeder {
  /**
   * Data Seeder
   * @param {number} seeds Number of seeds to generate
   * @param {Function} schema A function that receives the Faker API as an argument and returns the object schema to generate.
   */

  static seed(seeds: number, schema: SchemaFunction) {
    return [...Array(seeds)].map(() => schema(casual));
  }

  /**
   * Seeder CLI
   */
  static async startCLI() {
    try {
      let Model: string | undefined, Seeds: number | undefined, Reset: boolean | undefined, Type: string | null, Role: string | null;

      // Seed Command
      program.arguments('[model] [seedCount] [type] [role]').action((model, seeds, type, role) => {
        seeds = Number(seeds);

        if (!model) {
          console.log(`[Seeder]: Model or Collection is required.`);
          console.log(`[Seeder]: Please use this format 'npm run seed <collection/model> <number> [type(optional)] [role(optional)]'`);
          return process.exit(0);
        }

        if (!this[`${model}Schema`]) {
          console.log(`[Seeder]: Unknown ${model} collection/model.`);
          return process.exit(0);
        }

        if (!seeds) {
          console.log(`[Seeder]: Number of seed is required.`);
          console.log(`[Seeder]: Please use this format 'npm run seed ${model} <number> [type(optional)] [role(optional)]'`);
          return process.exit(0);
        }

        if (model && seeds) {
          Model = model;
          Seeds = seeds;
        }

        Type = type ? type : null;
        Role = role ? role : null;
      });

      // Reset Command
      program
        .command('reset')
        .arguments('<model>')
        .action(model => {
          if (!this[`${model}Schema`]) {
            console.log('[Seeder]: Unknown model.');
            return process.exit(0);
          }

          Reset = true;
          Model = model;
        });

      await program.parseAsync(process.argv);

      // Seed Action
      if (Model && Seeds) {
        console.log('[Seeder]: Started.');
        await database.startConnection();
        console.log('[Seeder]: Running...');
        await this[`${Model}Schema`](Seeds, false, Type, Role);
      }

      // Reset Action
      if (Reset && Model) {
        const MODEL_DEFINITION: Record<string, any> = {
          users: userModel,
          roles: roleModel,
        };
        console.log('[Seeder]: Started.');
        await database.startConnection();
        console.log('[Seeder]: Running...');
        await MODEL_DEFINITION[Model].deleteMany({});
      }

      console.log(Reset ? '[Seeder]: Reset Done.' : '[Seeder]: Done.');
      process.exit(0);
    } catch (error) {
      console.log('cli_error:', error);
    }
  }

  // Role Seeder
  static async rolesSchema(seeds: number, data: any, type?: string, roleName?: string | undefined) {
    const role = this.seed(seeds, casual => {
      roleName = roleName ? roleName : casual.words(2);
      return data ? data : { name: camelCase(roleName), label: capitalizeWords(roleName) };
    });

    await roleModel.create(role);
    console.log('[Seeder]: seeding-roles-done');
  }

  // User Seeder
  static async usersSchema(seeds: number, data: any, type?: string, role?: string | undefined) {
    const roleName = role || type || 'superAdmin';
    let testRole = await roleModel.findOne({ name: roleName });

    if (!testRole) {
      testRole = await roleModel.findOne(1, { name: 'users' });
    }

    const user = this.seed(seeds, casual => {
      const firstName = casual.last_name;
      const lastName = casual.last_name;
      const email = `${firstName}.${lastName}@mailinator.com`.toLowerCase();

      return {
        firstName,
        lastName,
        email: email || casual.email.toLowerCase(),
        password: 'P@ssw0rd01',
        role: testRole._id,
        enabled: 1,
        position: type || 'admin',
      };
    });

    console.log(user);

    await userModel.create(user);
    console.log('[Seeder]: seeding-users-done');
  }
}

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'seed') {
  Seeder.startCLI();
}
