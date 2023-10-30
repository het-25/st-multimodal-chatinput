/* istanbul ignore file */
import { Visitor } from '../visitor.mjs';
import { TimeUnit, UnionMode } from '../enum.mjs';
/** @ignore */ const sum = (x, y) => x + y;
/** @ignore */
export class GetByteLengthVisitor extends Visitor {
    visitNull(____, _) {
        return 0;
    }
    visitInt(data, _) {
        return data.type.bitWidth / 8;
    }
    visitFloat(data, _) {
        return data.type.ArrayType.BYTES_PER_ELEMENT;
    }
    visitBool(____, _) {
        return 1 / 8;
    }
    visitDecimal(data, _) {
        return data.type.bitWidth / 8;
    }
    visitDate(data, _) {
        return (data.type.unit + 1) * 4;
    }
    visitTime(data, _) {
        return data.type.bitWidth / 8;
    }
    visitTimestamp(data, _) {
        return data.type.unit === TimeUnit.SECOND ? 4 : 8;
    }
    visitInterval(data, _) {
        return (data.type.unit + 1) * 4;
    }
    visitStruct(data, i) {
        return data.children.reduce((total, child) => total + instance.visit(child, i), 0);
    }
    visitFixedSizeBinary(data, _) {
        return data.type.byteWidth;
    }
    visitMap(data, i) {
        // 4 + 4 for the indices
        return 8 + data.children.reduce((total, child) => total + instance.visit(child, i), 0);
    }
    visitDictionary(data, i) {
        var _a;
        return (data.type.indices.bitWidth / 8) + (((_a = data.dictionary) === null || _a === void 0 ? void 0 : _a.getByteLength(data.values[i])) || 0);
    }
}
/** @ignore */
const getUtf8ByteLength = ({ valueOffsets }, index) => {
    // 4 + 4 for the indices, `end - start` for the data bytes
    return 8 + (valueOffsets[index + 1] - valueOffsets[index]);
};
/** @ignore */
const getBinaryByteLength = ({ valueOffsets }, index) => {
    // 4 + 4 for the indices, `end - start` for the data bytes
    return 8 + (valueOffsets[index + 1] - valueOffsets[index]);
};
/** @ignore */
const getListByteLength = ({ valueOffsets, stride, children }, index) => {
    const child = children[0];
    const { [index * stride]: start } = valueOffsets;
    const { [index * stride + 1]: end } = valueOffsets;
    const visit = instance.getVisitFn(child.type);
    const slice = child.slice(start, end - start);
    let size = 8; // 4 + 4 for the indices
    for (let idx = -1, len = end - start; ++idx < len;) {
        size += visit(slice, idx);
    }
    return size;
};
/** @ignore */
const getFixedSizeListByteLength = ({ stride, children }, index) => {
    const child = children[0];
    const slice = child.slice(index * stride, stride);
    const visit = instance.getVisitFn(child.type);
    let size = 0;
    for (let idx = -1, len = slice.length; ++idx < len;) {
        size += visit(slice, idx);
    }
    return size;
};
/* istanbul ignore next */
/** @ignore */
const getUnionByteLength = (data, index) => {
    return data.type.mode === UnionMode.Dense ?
        getDenseUnionByteLength(data, index) :
        getSparseUnionByteLength(data, index);
};
/** @ignore */
const getDenseUnionByteLength = ({ type, children, typeIds, valueOffsets }, index) => {
    const childIndex = type.typeIdToChildIndex[typeIds[index]];
    // 4 for the typeId, 4 for the valueOffsets, then the child at the offset
    return 8 + instance.visit(children[childIndex], valueOffsets[index]);
};
/** @ignore */
const getSparseUnionByteLength = ({ children }, index) => {
    // 4 for the typeId, then once each for the children at this index
    return 4 + instance.visitMany(children, children.map(() => index)).reduce(sum, 0);
};
GetByteLengthVisitor.prototype.visitUtf8 = getUtf8ByteLength;
GetByteLengthVisitor.prototype.visitBinary = getBinaryByteLength;
GetByteLengthVisitor.prototype.visitList = getListByteLength;
GetByteLengthVisitor.prototype.visitFixedSizeList = getFixedSizeListByteLength;
GetByteLengthVisitor.prototype.visitUnion = getUnionByteLength;
GetByteLengthVisitor.prototype.visitDenseUnion = getDenseUnionByteLength;
GetByteLengthVisitor.prototype.visitSparseUnion = getSparseUnionByteLength;
/** @ignore */
export const instance = new GetByteLengthVisitor();

//# sourceMappingURL=bytelength.mjs.map
