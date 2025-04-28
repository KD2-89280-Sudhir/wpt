function createResult(error, data){
    if(data === undefined && error === undefined){
        return {error: null, data: null};
    }
    if(data !== undefined){
        return createSuccessResult(data);
    }else if(error !== undefined){
        return createErrorResult(error);
    }
}

function createSuccessResult(data){
    let result = {};
    result.status = 'success';
    result.data = data;
    return result;
}

function createErrorResult(error){
    let result = {};
    result.status = 'error';
    result.error = error;
    return result;
}

module.exports = { createResult, createSuccessResult, createErrorResult };