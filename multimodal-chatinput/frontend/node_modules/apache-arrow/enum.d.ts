/**
 * Logical types, vector layouts, and schemas
 *
 * @enum {number}
 */
export declare enum MetadataVersion {
    /**
     * 0.1.0 (October 2016).
     */
    V1 = 0,
    /**
     * 0.2.0 (February 2017). Non-backwards compatible with V1.
     */
    V2 = 1,
    /**
     * 0.3.0 -> 0.7.1 (May - December 2017). Non-backwards compatible with V2.
     */
    V3 = 2,
    /**
     * >= 0.8.0 (December 2017). Non-backwards compatible with V3.
     */
    V4 = 3,
    /**
     * >= 1.0.0 (July 2020. Backwards compatible with V4 (V5 readers can read V4
     * metadata and IPC messages). Implementations are recommended to provide a
     * V4 compatibility mode with V5 format changes disabled.
     *
     * Incompatible changes between V4 and V5:
     * - Union buffer layout has changed. In V5, Unions don't have a validity
     *   bitmap buffer.
     */
    V5 = 4
}
/**
 * @enum {number}
 */
export declare enum UnionMode {
    Sparse = 0,
    Dense = 1
}
/**
 * @enum {number}
 */
export declare enum Precision {
    HALF = 0,
    SINGLE = 1,
    DOUBLE = 2
}
/**
 * @enum {number}
 */
export declare enum DateUnit {
    DAY = 0,
    MILLISECOND = 1
}
/**
 * @enum {number}
 */
export declare enum TimeUnit {
    SECOND = 0,
    MILLISECOND = 1,
    MICROSECOND = 2,
    NANOSECOND = 3
}
/**
 * @enum {number}
 */
export declare enum IntervalUnit {
    YEAR_MONTH = 0,
    DAY_TIME = 1,
    MONTH_DAY_NANO = 2
}
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
export declare enum MessageHeader {
    NONE = 0,
    Schema = 1,
    DictionaryBatch = 2,
    RecordBatch = 3,
    Tensor = 4,
    SparseTensor = 5
}
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
export declare enum Type {
    NONE = 0,
    Null = 1,
    Int = 2,
    Float = 3,
    Binary = 4,
    Utf8 = 5,
    Bool = 6,
    Decimal = 7,
    Date = 8,
    Time = 9,
    Timestamp = 10,
    Interval = 11,
    List = 12,
    Struct = 13,
    Union = 14,
    FixedSizeBinary = 15,
    FixedSizeList = 16,
    Map = 17,
    Dictionary = -1,
    Int8 = -2,
    Int16 = -3,
    Int32 = -4,
    Int64 = -5,
    Uint8 = -6,
    Uint16 = -7,
    Uint32 = -8,
    Uint64 = -9,
    Float16 = -10,
    Float32 = -11,
    Float64 = -12,
    DateDay = -13,
    DateMillisecond = -14,
    TimestampSecond = -15,
    TimestampMillisecond = -16,
    TimestampMicrosecond = -17,
    TimestampNanosecond = -18,
    TimeSecond = -19,
    TimeMillisecond = -20,
    TimeMicrosecond = -21,
    TimeNanosecond = -22,
    DenseUnion = -23,
    SparseUnion = -24,
    IntervalDayTime = -25,
    IntervalYearMonth = -26
}
export declare enum BufferType {
    /**
     * used in List type, Dense Union and variable length primitive types (String, Binary)
     */
    OFFSET = 0,
    /**
     * actual data, either wixed width primitive types in slots or variable width delimited by an OFFSET vector
     */
    DATA = 1,
    /**
     * Bit vector indicating if each value is null
     */
    VALIDITY = 2,
    /**
     * Type vector used in Union type
     */
    TYPE = 3
}
