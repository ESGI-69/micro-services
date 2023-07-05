import { GrpcTransport } from '@protobuf-ts/grpc-transport';
import { ChannelCredentials } from '@grpc/grpc-js';
import { env } from '$env/dynamic/private';
import { UserServiceClient } from '$lib/stubs/user/v1alpha/service.client';

export const credentials = ChannelCredentials.createInsecure();

const userTransport = new GrpcTransport({
	host: env.USER_API_URL as string,
	channelCredentials: credentials,
});

export const userClient = new UserServiceClient(userTransport);
