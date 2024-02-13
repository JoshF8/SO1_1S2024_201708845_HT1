export namespace main {
	
	export class RamInfo {
	    totalRAM: number;
	    freeRAM: number;
	
	    static createFrom(source: any = {}) {
	        return new RamInfo(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.totalRAM = source["totalRAM"];
	        this.freeRAM = source["freeRAM"];
	    }
	}
	export class WindowSize {
	    width: number;
	    height: number;
	
	    static createFrom(source: any = {}) {
	        return new WindowSize(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.width = source["width"];
	        this.height = source["height"];
	    }
	}

}

