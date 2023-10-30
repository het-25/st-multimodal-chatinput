import { Data } from '../data.js';
import { Visitor } from '../visitor.js';
import { TypeToDataType } from '../interfaces.js';
import { Type } from '../enum.js';
import { DataType, Dictionary, Float, Int, Date_, Interval, Time, Timestamp, Bool, Null, Utf8, Binary, Decimal, FixedSizeBinary, List, FixedSizeList, Map_, Struct, DenseUnion, SparseUnion } from '../type.js';
/** @ignore */
export interface GetByteLengthVisitor extends Visitor {
    visit<T extends DataType>(node: Data<T>, index: number): number;
    visitMany<T extends DataType>(nodes: Data<T>[], index: number[]): number[];
    getVisitFn<T extends DataType>(node: Data<T> | T): (data: Data<T>, index: number) => number;
    getVisitFn<T extends Type>(node: T): (data: Data<TypeToDataType<T>>, index: number) => number;
    visitBinary<T extends Binary>(data: Data<T>, index: number): number;
    visitUtf8<T extends Utf8>(data: Data<T>, index: number): number;
    visitList<T extends List>(data: Data<T>, index: number): number;
    visitDenseUnion<T extends DenseUnion>(data: Data<T>, index: number): number;
    visitSparseUnion<T extends SparseUnion>(data: Data<T>, index: number): number;
    visitFixedSizeList<T extends FixedSizeList>(data: Data<T>, index: number): number;
}
/** @ignore */
export declare class GetByteLengthVisitor extends Visitor {
    visitNull(____: Data<Null>, _: number): number;
    visitInt(data: Data<Int>, _: number): number;
    visitFloat(data: Data<Float>, _: number): number;
    visitBool(____: Data<Bool>, _: number): number;
    visitDecimal(data: Data<Decimal>, _: number): number;
    visitDate(data: Data<Date_>, _: number): number;
    visitTime(data: Data<Time>, _: number): number;
    visitTimestamp(data: Data<Timestamp>, _: number): 4 | 8;
    visitInterval(data: Data<Interval>, _: number): number;
    visitStruct(data: Data<Struct>, i: number): number;
    visitFixedSizeBinary(data: Data<FixedSizeBinary>, _: number): number;
    visitMap(data: Data<Map_>, i: number): number;
    visitDictionary(data: Data<Dictionary>, i: number): number;
}
/** @ignore */
export declare const instance: GetByteLengthVisitor;
