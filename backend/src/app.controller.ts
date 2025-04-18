import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { SessionContainer } from 'supertokens-node/recipe/session';
import Multitenancy from 'supertokens-node/recipe/multitenancy';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { Session } from './auth/session/session.decorator';
import { deleteUser } from 'supertokens-node';
import { ApiParam } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/sessioninfo')
  @UseGuards(new AuthGuard())
  getSessionInfo(
    @Session() session: SessionContainer,
  ): Record<string, unknown> {
    return {
      sessionHandle: session.getHandle(),
      userId: session.getUserId(),
      accessTokenPayload: session.getAccessTokenPayload(),
    };
  }

  // This API is used by the frontend to create the tenants drop down when the app loads.
  // Depending on your UX, you can remove this API.
  @Get('/tenants')
  async getTenants(): Promise<any> {
    return await Multitenancy.listAllTenants();
  }

  @Delete('remove-user/:userId')
  @ApiParam({
    name: 'userId',
    description: 'UUID of the user to delete',
    type: String,
  })
  async deleteUserForId(@Param('userId') userId: string): Promise<{ status: string }> {
    const result = await deleteUser(userId);
    return result;
  }
}