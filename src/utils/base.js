/** 随机index */
export const randomIndex = (max) => {
  const res = Math.floor(Math.random() * max);
  return res;
};

/** blob二进制 to base64 */
export const blobToDataURI = (blob, callback) => {
  var reader = new FileReader();
  reader.onload = function (e) {
    callback(e.target.result);
  };
  reader.readAsDataURL(blob);
};

/** base64  to blob二进制 */
export const dataURItoBlob = (dataURI) => {
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0]; // mime类型
  var byteString = atob(dataURI.split(",")[1]); //base64 解码
  var arrayBuffer = new ArrayBuffer(byteString.length); //创建缓冲数组
  var intArray = new Uint8Array(arrayBuffer); //创建视图

  for (var i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }
  return new Blob([intArray], { type: mimeString });
};

/** 下载blob 仅支持web下载，移动端下载失败 */
export const toDownloadBlob = (fileName, fileData, fileType) => {
  const downLink = document.createElement("a");
  downLink.download = fileName;
  //字符内容转换为blod地址
  const blob = new Blob([JSON.stringify(fileData)], {type: fileType || "octet/stream"});
  downLink.href = URL.createObjectURL(blob);
  // 链接插入到页面
  document.body.appendChild(downLink);
  downLink.click();
  // 移除下载链接
  document.body.removeChild(downLink);
};

/** 下载文件 */
export const toDownload = (fileName, fileData) => {
  const downLink = document.createElement("a");
  downLink.download = fileName;
  downLink.href = fileData;
  downLink.target = "_blank";
  // 链接插入到页面
  document.body.appendChild(downLink);
  downLink.click();
  // 移除下载链接
  document.body.removeChild(downLink);
};

/** 数据转换为文件后下载 */
export const toDownFile = (fileName, value) => {
  //字符内容转换为blod地址
  const blob = new Blob([JSON.stringify(value)]);
  blobToDataURI(blob, (fileData) => toDownload(fileName, fileData));
};

/** 读取文件内容 */
export const toReadFile = (fileValue, callback) => {
  const render = new FileReader();
  render.onload = () => {
    const res = JSON.parse(render.result);
    callback(res);
  };
  render.readAsText(fileValue);
};
