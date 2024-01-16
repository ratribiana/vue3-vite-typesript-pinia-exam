import PublicRoute from '@/routes/auth.route';
import UsersRoute from '@routes/users.route';
import WelcomeRoute from '@/routes/welcome.route';

const routes = [new UsersRoute(), new PublicRoute(), new WelcomeRoute()];

export default routes;
