import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { GrpcInstrumentation } from '@opentelemetry/instrumentation-grpc';
import { WinstonInstrumentation } from '@opentelemetry/instrumentation-winston';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { MongooseInstrumentation } from '@opentelemetry/instrumentation-mongoose';

// Register instrumentations for gRPC and Winston
registerInstrumentations({
  instrumentations: [
    new GrpcInstrumentation(),
    new WinstonInstrumentation(),
    new MongooseInstrumentation(),
  ],
});
