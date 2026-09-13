import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginInput } from '../contracts/inputs/login.input';
import { LoginType } from '../contracts/types/login.type';
import { AuthService } from '../services/auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly service: AuthService) {}

  @Mutation(() => LoginType, {
    description: 'Autentica um corretor e retorna o token JWT.',
  })
  login(
    @Args('data', {
      type: () => LoginInput,
      description: 'Credenciais de acesso.',
    })
    data: LoginInput,
  ): Promise<LoginType> {
    return this.service.login(data);
  }
}
