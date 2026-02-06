import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";

export async function register() {
    if (process.env.NEXT_RUNTIME === "nodejs") {
        const { NodeSDK } = await import("@opentelemetry/sdk-node");
        const { OTLPTraceExporter } = await import("@opentelemetry/exporter-trace-otlp-http");
        const { getNodeAutoInstrumentations } = await import("@opentelemetry/auto-instrumentations-node");

        const otlpEndpoint = process.env.GRAFANA_OTLP_ENDPOINT;
        const grafanaAuth = process.env.GRAFANA_AUTH_TOKEN;

        if (!otlpEndpoint || !grafanaAuth) {
            if (process.env.NODE_ENV === "development") {
                console.warn("OpenTelemetry: GRAFANA_OTLP_ENDPOINT or GRAFANA_AUTH_TOKEN is missing. Instrumentation skipped.");
            }
            return;
        }

        const sdk = new NodeSDK({
            resource: new Resource({
                [SemanticResourceAttributes.SERVICE_NAME]: "tractus-backend",
            }),
            traceExporter: new OTLPTraceExporter({
                url: `${otlpEndpoint}/v1/traces`,
                headers: {
                    Authorization: `Basic ${grafanaAuth}`,
                },
            }),
            instrumentations: [getNodeAutoInstrumentations()],
        });

        sdk.start();
        console.log("OpenTelemetry Backend Instrumentation started.");
    }
}
