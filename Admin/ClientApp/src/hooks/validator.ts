export const validateImage = (label: any, value: any) => {
    if (
      value === null ||
      value === undefined ||
      (value !== null && value !== undefined && value === "")
    ) {
      return Promise.reject(new Error(`Please choose your image`));
    }
    if (value.fileList.length === 0) {
      return Promise.reject(new Error(`Please choose your image`));
    } else {
      if (!value.fileList[0].type.match("image.*")) {
        return Promise.reject(new Error(`Please choose only image`));
      }
    }
  
    return Promise.resolve();
  };