"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoubleLinkedList = exports.Node = void 0;
var Node = /** @class */ (function () {
    function Node(input) {
        var _a, _b, _c;
        this.Value = ((_a = input) === null || _a === void 0 ? void 0 : _a.Value) || input;
        this.Next = ((_b = input) === null || _b === void 0 ? void 0 : _b.Next) || null;
        this.Pre = ((_c = input) === null || _c === void 0 ? void 0 : _c.Pre) || null;
    }
    Object.defineProperty(Node.prototype, "Value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "Next", {
        get: function () {
            return this._next;
        },
        set: function (next) {
            this._next = next;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "Pre", {
        get: function () {
            return this._pre;
        },
        set: function (pre) {
            this._pre = pre;
        },
        enumerable: false,
        configurable: true
    });
    Node.prototype.toString = function (callback) {
        return callback ? callback(this.Value) : "" + this.Value;
    };
    return Node;
}());
exports.Node = Node;
var DoubleLinkedList = /** @class */ (function () {
    function DoubleLinkedList(input) {
        if ((typeof input != typeof new Object())) {
            if (input == undefined) {
                this._root = null;
                this._tail = null;
                this._length = 0;
            }
            else {
                this.Add(input);
            }
        }
        else {
            if (input.length != 0) {
                for (var i = 0; i < input.length; i++) {
                    this.Add(input[i]);
                }
            }
        }
    }
    Object.defineProperty(DoubleLinkedList.prototype, "Length", {
        get: function () {
            var i = 0;
            if (this._length != 0) {
                var tmp = this._root;
                while (tmp != null) {
                    tmp = tmp.Next;
                    i++;
                }
            }
            else {
                this._length = 0;
            }
            return this._length;
        },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(DoubleLinkedList.prototype, "MaxIndex", {
        get: function () {
            return this._length - 1;
        },
        enumerable: false,
        configurable: true
    });
    DoubleLinkedList.prototype.CreateFirstNode = function (value) {
        if (this._length === undefined || isNaN(this._length)) {
            this._length = 0;
        }
        if (this._length == 0) {
            this._root = new Node(value);
            this._tail = this._root;
            this[this._length] = this._root;
            this._length++;
            return null;
        }
        return value;
    };
    DoubleLinkedList.prototype.Add = function (value) {
        value = this.CreateFirstNode(value);
        if (value != null) {
            var tmp = this._tail;
            this._tail.Next = new Node(value);
            this._tail = this._tail.Next;
            this._tail.Pre = tmp;
            this._length++;
            this[this.MaxIndex] = this._tail;
        }
    };
    DoubleLinkedList.prototype.Unshift = function (value) {
        value = this.CreateFirstNode(value);
        if (value != null) {
            var tmp = this._root;
            this._root = new Node(value);
            this._root.Next = tmp;
            tmp.Pre = this._root;
            this._length++;
            this.ActualizeIndexes();
        }
    };
    DoubleLinkedList.prototype.ActualizeIndexes = function () {
        var tmp = this._root;
        var i = 0;
        while (tmp != null) {
            this[i] = tmp;
            i++;
            tmp = tmp.Next;
        }
    };
    DoubleLinkedList.prototype.toArray = function () {
        var nodes = [];
        var currentNode = this._root;
        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.Next;
        }
        return nodes;
    };
    DoubleLinkedList.prototype.toString = function (callback) {
        return this.toArray().map(function (node) { return node.toString(callback); }).toString();
    };
    return DoubleLinkedList;
}());
exports.DoubleLinkedList = DoubleLinkedList;
var arr = [1];
var myList = new DoubleLinkedList(arr);
myList.Unshift(100);
myList.Unshift(4);
myList.Add(7);
console.log(myList);
