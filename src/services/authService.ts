import { execCommand } from '../utils/execCommand';

class AuthService {
  async getGithubToken(): Promise<string> {

    const { stdout } = await execCommand('gh auth token');

    const token = stdout.toString().trim();

    return token;
  }
}

export const authService = new AuthService();
