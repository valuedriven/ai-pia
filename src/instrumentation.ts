import { registerOTel } from "@vercel/otel";

export function register() {
    if (process.env.OTEL_EXPORTER_OTLP_ENDPOINT) {
        registerOTel({
            serviceName: "tractus-backend",
        });
    }
}
