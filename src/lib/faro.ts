import { initializeFaro, getWebInstrumentations } from "@grafana/faro-web-sdk";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";

export function initMonitoring() {
    if (typeof window === "undefined") return;

    const faroUrl = process.env.NEXT_PUBLIC_FARO_URL;

    if (!faroUrl) {
        return;
    }

    initializeFaro({
        url: faroUrl,
        app: {
            name: "tractus-shop",
            version: "1.0.0",
            environment: process.env.NODE_ENV || "development",
        },
        instrumentations: [
            ...getWebInstrumentations(),
            new TracingInstrumentation(),
        ],
    });

    console.log("Faro RUM initialized successfully.");
}
