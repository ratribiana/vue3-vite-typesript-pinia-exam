import dotenv from 'dotenv';
import database from '@database';
import roleModel from '@models/roles.model';
import userModel from '@models/users.model';

dotenv.config({ path: '.env.development' });

(async () => {
  await database.startConnection();

  const role = await roleModel.findOne({ name: 'users' });

  await userModel.deleteMany({ role: role?._id });
  console.log('[DATABASE] Users successfully cleared');

  process.exit();
})();
