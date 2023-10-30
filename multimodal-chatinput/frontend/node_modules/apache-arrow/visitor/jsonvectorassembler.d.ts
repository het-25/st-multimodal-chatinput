import { Data } from '../data.js';
import { Field } from '../schema.js';
import { Vector } from '../vector.js';
import { Visitor } from '../visitor.js';
import { RecordBatch } from '../recordbatch.js';
import { DataType, Float, Int, Date_, Interval, Time, Timestamp, Union, Bool, Null, Utf8, Binary, Decimal, FixedSizeBinary, List, FixedSizeList, Map_, Struct } from '../type.js';
/** @ignore */
export interface JSONVectorAssembler extends Visitor {
    visit<T extends DataType>(field: Field, node: Data<T>): Record<string, unknown>;
    visitMany<T extends DataType>(fields: Field[], nodes: readonly Data<T>[]): Record<string, unknown>[];
    getVisitFn<T extends DataType>(node: Vector<T> | Data<T>): (data: Data<T>) => {
        name: string;
        count: number;
        VALIDITY: (0 | 1)[];
        DATA?: any[];
        OFFSET?: number[];
        TYPE?: number[];
        children?: any[];
    };
    visitNull<T extends Null>(data: Data<T>): Record<string, never>;
    visitBool<T extends Bool>(data: Data<T>): {
        DATA: boolean[];
    };
    visitInt<T extends Int>(data: Data<T>): {
        DATA: number[] | string[];
    };
    visitFloat<T extends Float>(data: Data<T>): {
        DATA: number[];
    };
    visitUtf8<T extends Utf8>(data: Data<T>): {
        DATA: string[];
        OFFSET: number[];
    };
    visitBinary<T extends Binary>(data: Data<T>): {
        DATA: string[];
        OFFSET: number[];
    };
    visitFixedSizeBinary<T extends FixedSizeBinary>(data: Data<T>): {
        DATA: string[];
    };
    visitDate<T extends Date_>(data: Data<T>): {
        DATA: number[];
    };
    visitTimestamp<T extends Timestamp>(data: Data<T>): {
        DATA: string[];
    };
    visitTime<T extends Time>(data: Data<T>): {
        DATA: number[];
    };
    visitDecimal<T extends Decimal>(data: Data<T>): {
        DATA: string[];
    };
    visitList<T extends List>(data: Data<T>): {
        children: any[];
        OFFSET: number[];
    };
    visitStruct<T extends Struct>(data: Data<T>): {
        children: any[];
    };
    visitUnion<T extends Union>(data: Data<T>): {
        children: any[];
        TYPE: number[];
    };
    visitInterval<T extends Interval>(data: Data<T>): {
        DATA: number[];
    };
    visitFixedSizeList<T extends FixedSizeList>(data: Data<T>): {
        children: any[];
    };
    visitMap<T extends Map_>(data: Data<T>): {
        children: any[];
    };
}
/** @ignore */
export declare class JSONVectorAssembler extends Visitor {
    /** @nocollapse */
    static assemble<T extends RecordBatch>(...batches: T[]): Record<string, unknown>[][];
}
