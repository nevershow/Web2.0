function Base(instanceVariable) {
    this.instanceVariable = instanceVariable;
};

Base.staticVariable = 'Base';

Base.staticMethod = function() {
    console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
};

Base.prototype.instanceMethod = function () {
    console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
};


function Derived(instanceVariable) {
    this.instanceVariable = instanceVariable;
};

Derived.staticVariable = 'Derived';

function extend(base, derived) {
    derived.prototype = new base();
    derived.staticMethod = function() {
        base.staticMethod.call(this);
        console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
    };

    derived.prototype.instanceMethod = function () {
        base.prototype.instanceMethod.call(this);
        console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
    };
}

extend(Base, Derived);

// Test 1
example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();

console.log("\n------------------------------------------------------------\n");
//Test 2
example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();
