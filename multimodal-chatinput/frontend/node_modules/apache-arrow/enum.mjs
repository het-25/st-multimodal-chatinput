// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
////
//
// A few enums copied from `fb/Schema.ts` and `fb/Message.ts` because Webpack
// v4 doesn't seem to be able to tree-shake the rest of those exports.
//
// We will have to keep these enums in sync when we re-generate the flatbuffers
// code from the shchemas. See js/DEVELOP.md for info on how to run flatbuffers
// code generation.
//
////
/**
 * Logical types, vector layouts, and schemas
 *
 * @enum {number}
 */
export var MetadataVersion;
(function (MetadataVersion) {
    /**
     * 0.1.0 (October 2016).
     */
    MetadataVersion[MetadataVersion["V1"] = 0] = "V1";
    /**
     * 0.2.0 (February 2017). Non-backwards compatible with V1.
     */
    MetadataVersion[MetadataVersion["V2"] = 1] = "V2";
    /**
     * 0.3.0 -> 0.7.1 (May - December 2017). Non-backwards compatible with V2.
     */
    MetadataVersion[MetadataVersion["V3"] = 2] = "V3";
    /**
     * >= 0.8.0 (December 2017). Non-backwards compatible with V3.
     */
    MetadataVersion[MetadataVersion["V4"] = 3] = "V4";
    /**
     * >= 1.0.0 (July 2020. Backwards compatible with V4 (V5 readers can read V4
     * metadata and IPC messages). Implementations are recommended to provide a
     * V4 compatibility mode with V5 format changes disabled.
     *
     * Incompatible changes between V4 and V5:
     * - Union buffer layout has changed. In V5, Unions don't have a validity
     *   bitmap buffer.
     */
    MetadataVersion[MetadataVersion["V5"] = 4] = "V5";
})(MetadataVersion || (MetadataVersion = {}));
/**
 * @enum {number}
 */
export var UnionMode;
(function (UnionMode) {
    UnionMode[UnionMode["Sparse"] = 0] = "Sparse";
    UnionMode[UnionMode["Dense"] = 1] = "Dense";
})(UnionMode || (UnionMode = {}));
/**
 * @enum {number}
 */
export var Precision;
(function (Precision) {
    Precision[Precision["HALF"] = 0] = "HALF";
    Precision[Precision["SINGLE"] = 1] = "SINGLE";
    Precision[Precision["DOUBLE"] = 2] = "DOUBLE";
})(Precision || (Precision = {}));
/**
 * @enum {number}
 */
export var DateUnit;
(function (DateUnit) {
    DateUnit[DateUnit["DAY"] = 0] = "DAY";
    DateUnit[DateUnit["MILLISECOND"] = 1] = "MILLISECOND";
})(DateUnit || (DateUnit = {}));
/**
 * @enum {number}
 */
export var TimeUnit;
(function (TimeUnit) {
    TimeUnit[TimeUnit["SECOND"] = 0] = "SECOND";
    TimeUnit[TimeUnit["MILLISECOND"] = 1] = "MILLISECOND";
    TimeUnit[TimeUnit["MICROSECOND"] = 2] = "MICROSECOND";
    TimeUnit[TimeUnit["NANOSECOND"] = 3] = "NANOSECOND";
})(TimeUnit || (TimeUnit = {}));
/**
 * @enum {number}
 */
export var IntervalUnit;
(function (IntervalUnit) {
    IntervalUnit[IntervalUnit["YEAR_MONTH"] = 0] = "YEAR_MONTH";
    IntervalUnit[IntervalUnit["DAY_TIME"] = 1] = "DAY_TIME";
    IntervalUnit[IntervalUnit["MONTH_DAY_NANO"] = 2] = "MONTH_DAY_NANO";
})(IntervalUnit || (IntervalUnit = {}));
/**
 * ----------------------------------------------------------------------
 * The root Message type
 * This union enables us to easily send different message types without
 * redundant storage, and in the future we can easily add new message types.
 *
 * Arrow implementations do not need to implement all of the message types,
 * which may include experimental metadata types. For maximum compatibility,
 * it is best to send data using RecordBatch
 *
 * @enum {number}
 */
export var MessageHeader;
(function (MessageHeader) {
    MessageHeader[MessageHeader["NONE"] = 0] = "NONE";
    MessageHeader[MessageHeader["Schema"] = 1] = "Schema";
    MessageHeader[MessageHeader["DictionaryBatch"] = 2] = "DictionaryBatch";
    MessageHeader[MessageHeader["RecordBatch"] = 3] = "RecordBatch";
    MessageHeader[MessageHeader["Tensor"] = 4] = "Tensor";
    MessageHeader[MessageHeader["SparseTensor"] = 5] = "SparseTensor";
})(MessageHeader || (MessageHeader = {}));
/**
 * Main data type enumeration.
 *
 * Data types in this library are all *logical*. They can be expressed as
 * either a primitive physical type (bytes or bits of some fixed size), a
 * nested type consisting of other data types, or another data type (e.g. a
 * timestamp encoded as an int64).
 *
 * **Note**: Only enum values 0-17 (NONE through Map) are written to an Arrow
 * IPC payload.
 *
 * The rest of the values are specified here so TypeScript can narrow the type
 * signatures further beyond the base Arrow Types. The Arrow DataTypes include
 * metadata like `bitWidth` that impact the type signatures of the values we
 * accept and return.
 *
 * For example, the `Int8Vector` reads 1-byte numbers from an `Int8Array`, an
 * `Int32Vector` reads a 4-byte number from an `Int32Array`, and an `Int64Vector`
 * reads a pair of 4-byte lo, hi 32-bit integers as a zero-copy slice from the
 * underlying `Int32Array`.
 *
 * Library consumers benefit by knowing the narrowest type, since we can ensure
 * the types across all public methods are propagated, and never bail to `any`.
 * These values are _never_ used at runtime, and they will _never_ be written
 * to the flatbuffers metadata of serialized Arrow IPC payloads.
 */
export var Type;
(function (Type) {
    Type[Type["NONE"] = 0] = "NONE";
    Type[Type["Null"] = 1] = "Null";
    Type[Type["Int"] = 2] = "Int";
    Type[Type["Float"] = 3] = "Float";
    Type[Type["Binary"] = 4] = "Binary";
    Type[Type["Utf8"] = 5] = "Utf8";
    Type[Type["Bool"] = 6] = "Bool";
    Type[Type["Decimal"] = 7] = "Decimal";
    Type[Type["Date"] = 8] = "Date";
    Type[Type["Time"] = 9] = "Time";
    Type[Type["Timestamp"] = 10] = "Timestamp";
    Type[Type["Interval"] = 11] = "Interval";
    Type[Type["List"] = 12] = "List";
    Type[Type["Struct"] = 13] = "Struct";
    Type[Type["Union"] = 14] = "Union";
    Type[Type["FixedSizeBinary"] = 15] = "FixedSizeBinary";
    Type[Type["FixedSizeList"] = 16] = "FixedSizeList";
    Type[Type["Map"] = 17] = "Map";
    Type[Type["Dictionary"] = -1] = "Dictionary";
    Type[Type["Int8"] = -2] = "Int8";
    Type[Type["Int16"] = -3] = "Int16";
    Type[Type["Int32"] = -4] = "Int32";
    Type[Type["Int64"] = -5] = "Int64";
    Type[Type["Uint8"] = -6] = "Uint8";
    Type[Type["Uint16"] = -7] = "Uint16";
    Type[Type["Uint32"] = -8] = "Uint32";
    Type[Type["Uint64"] = -9] = "Uint64";
    Type[Type["Float16"] = -10] = "Float16";
    Type[Type["Float32"] = -11] = "Float32";
    Type[Type["Float64"] = -12] = "Float64";
    Type[Type["DateDay"] = -13] = "DateDay";
    Type[Type["DateMillisecond"] = -14] = "DateMillisecond";
    Type[Type["TimestampSecond"] = -15] = "TimestampSecond";
    Type[Type["TimestampMillisecond"] = -16] = "TimestampMillisecond";
    Type[Type["TimestampMicrosecond"] = -17] = "TimestampMicrosecond";
    Type[Type["TimestampNanosecond"] = -18] = "TimestampNanosecond";
    Type[Type["TimeSecond"] = -19] = "TimeSecond";
    Type[Type["TimeMillisecond"] = -20] = "TimeMillisecond";
    Type[Type["TimeMicrosecond"] = -21] = "TimeMicrosecond";
    Type[Type["TimeNanosecond"] = -22] = "TimeNanosecond";
    Type[Type["DenseUnion"] = -23] = "DenseUnion";
    Type[Type["SparseUnion"] = -24] = "SparseUnion";
    Type[Type["IntervalDayTime"] = -25] = "IntervalDayTime";
    Type[Type["IntervalYearMonth"] = -26] = "IntervalYearMonth";
})(Type || (Type = {}));
export var BufferType;
(function (BufferType) {
    /**
     * used in List type, Dense Union and variable length primitive types (String, Binary)
     */
    BufferType[BufferType["OFFSET"] = 0] = "OFFSET";
    /**
     * actual data, either wixed width primitive types in slots or variable width delimited by an OFFSET vector
     */
    BufferType[BufferType["DATA"] = 1] = "DATA";
    /**
     * Bit vector indicating if each value is null
     */
    BufferType[BufferType["VALIDITY"] = 2] = "VALIDITY";
    /**
     * Type vector used in Union type
     */
    BufferType[BufferType["TYPE"] = 3] = "TYPE";
})(BufferType || (BufferType = {}));

//# sourceMappingURL=enum.mjs.map
