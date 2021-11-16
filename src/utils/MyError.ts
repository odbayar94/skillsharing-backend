import {IError} from "../interfaces"

class MyError extends Error {
      messageCode: string;
      statusCode: number;
    
        constructor(error: IError) {
          super(error.message);
          this.statusCode = error.statusCode;
          this.messageCode = error.messageCode;
        }
}
      
export = MyError;