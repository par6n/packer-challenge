namespace com.mobiquity.packer {
  export class ApiError extends Error {
    message: string;

    constructor(message: string) {
      super();
      this.message = message;
    }
  }
}
