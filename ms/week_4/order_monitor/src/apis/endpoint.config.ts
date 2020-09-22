const SERVER = "https://codebrew.kr";
const API_PREFIX = "openapi";

interface Config {
  orders: {
    request: {
      success(options: { error?: boolean }): string;
      failure(): string;
      timeline(date: string): string;
    };
  };
}

// process.env.production 분기!!
const config: Config = {
  orders: {
    request: {
      success: ({ error = false }) =>
        `${SERVER}/${API_PREFIX}/orders/request/success${
          error ? "?error=random" : ""
        }`,
      failure: () => `${SERVER}/${API_PREFIX}/orders/request/failure`,
      timeline: date => `${SERVER}/${API_PREFIX}/orders/request/all/${date}`
    }
  }
};

export default config;
