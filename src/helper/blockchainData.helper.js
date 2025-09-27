const { bigIntReplacer } = require('../utils/fn');

function mapData(contractABI, functionName, outputData) {
    const functionInterface = contractABI.find((interface) => interface.name === functionName);

    if (!functionInterface) {
        return null;
    }

    const isTupleArray = functionInterface.outputs[0].type === 'tuple[]';
    const outputInterface = isTupleArray ? functionInterface.outputs[0]['components'] : functionInterface.outputs;

    if (isTupleArray) {
        const mappedData = outputData.map((data) => {
            const mappedObject = {};

            outputInterface.forEach((output, index) => {
                // serialize bigInt
                if (typeof data[index] === 'bigint') {
                    mappedObject[output.name] = data[index].toString();
                }
                else{
                    mappedObject[output.name] = data[index];
                }
            });

            return mappedObject;
        });

        return JSON.parse(JSON.stringify(mappedData, bigIntReplacer));
    } else {
        const isTuple = outputInterface[0].type.toString().includes('tuple');

        if(isTuple){
            const mappedData = {};
            const newOutputInterface = outputInterface[0]['components'];
            newOutputInterface.forEach((output, index) => {
                mappedData[output.name] = outputData[index];
            });
            return JSON.parse(JSON.stringify(mappedData, bigIntReplacer));
        }
        else{
            const mappedData = {};
    
            outputInterface.forEach((output, index) => {
                if(output.type.includes('[]')){
                    mappedData[output.name] = outputData
                }
                else{
                    mappedData[output.name] = outputData[index];
                }
            });
    
            return JSON.parse(JSON.stringify(mappedData, bigIntReplacer));
        }
    }
}

function serializeBigInt(value) {
    if (typeof value === 'bigint') {
        return value.toString();
    }

    return value;
}

function mapLogs(logs, eventName, contractABI) {
    const eventInterface = contractABI.find((interface) => interface.name === eventName);

    if (!eventInterface) {
        return null;
    }

    const outputInterface = eventInterface.inputs;
    const mappedLogs = []

    for(let i = 0; i < logs.length; i++){
        const mappedData = {};
        outputInterface.forEach((output, index) => {
            mappedData[output.name] = logs[i].args[index];
        });
        mappedData.type = eventName;
        mappedLogs.push(JSON.parse(JSON.stringify(mappedData, bigIntReplacer)))
    }

    return mappedLogs;
}

module.exports = {
    mapData,
    mapLogs,
    serializeBigInt
}
