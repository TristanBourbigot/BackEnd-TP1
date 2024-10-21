export class Error{

    constructor(code, message){
        this.code = code ?? 500;
        this.message = message ?? "unknow error";
    }
}