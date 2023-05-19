// IDB curd相关的方法
import Vue from "vue";
import { Notify } from "quasar";

/** IDB表-数组 */
export const objStoreArr = [
  // person
  {
    name: "person",
    keyPath: "id",
    createIndexs: [
      {
        name: "name",
        attrName: "name",
        setting: { unique: false },
      },
    ],
  },
  // anniversaries
  {
    name: "anniversaries",
    keyPath: "key",
  },
  // dailyTask
  {
    name: "dailyTask",
    keyPath: "id",
    createIndexs: [
      {
        name: "task",
        attrName: "task",
        setting: { unique: false },
      },
    ],
  },
];

/**
 * 打开/链接 数据库
 * @param   {string}    databaseName  数据库名
 * @param   {number}    version       版本号
 * @param   {Function}  callback      成功回调函数
 */
export const openDB = (databaseName, version, callback) => {
  // 打开/连接数据库
  const request = window.indexedDB.open(databaseName, version);

  // 失败
  request.onerror = function (event) {
    Notify.create({
      message: "连接数据库失败",
      color: "warning",
    });
    callback?.({
      status: 'fail',
      message: '连接数据库失败',
      data: null,
    });
  };
  // 成功
  request.onsuccess = function (event) {
    // 获取数据
    Vue.prototype.IDB_T = request.result;

    Notify.create({
      message: "连接数据库成功",
      color: "teal",
    });

    callback?.({
      status: 'success',
      message: '连接数据库成功',
      data: null,
    });
  };
  // 升级 指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件
  request.onupgradeneeded = function (event) {
    // 获取数据
    Vue.prototype.IDB_T = event?.target?.result;
    // 创建表
    objStoreArr.forEach((itemParams) => {
      // 判断是否存在表
      if (!Vue.prototype.IDB_T?.objectStoreNames.contains(itemParams.name)) {
        createDB_ObjectStore(itemParams);
      }
    });
  };
};

/** 关闭数据库 */
export const closeDB = () => {
  try {
    // IDB数据库未链接/打开，直接抛错
    if (!Vue.prototype.IDB_T) throw "关闭数据库失败:IDB数据库未链接,无需关闭";

    // 断开/关闭 IDB; 关闭数据库后，无法操作数据，但是可以建表;
    Vue.prototype.IDB_T.close();

    Notify.create({
      message: "已断开数据库链接",
      color: "teal",
    });
  } catch (error) {
    Notify.create({
      message: `${error}`,
      color: "warning",
    });
  }
};

/** 删除数据库 */
export const deleteDB = (databaseName, callback) => {
  const request = window.indexedDB.deleteDatabase(databaseName);
  
  request.onerror = function (event) {

    Notify.create({
      message: "删除数据库失败",
      color: "warning",
    });

    callback?.({
      status: 'fail',
      message: '删除数据库失败',
      data: null,
    })
  };
  request.onsuccess = function (event) {

    Notify.create({
      message: "删除数据库成功",
      color: "teal",
    });

    callback?.({
      status: 'success',
      message: '删除数据库成功',
      data: null,
    })
  };
};

/** 
 * 创建表
 * @param   {string}    name          表名
 * @param   {string}    keyPath       主键
 * @param   {any[]}     createIndexs  索引
 * createIndexs: [{
      name: 'name',
      attrName: 'name',
      setting: { 
        unique: false, // 是否包含重复的值
      },
    }],
 */
const createDB_ObjectStore = (params) => {
  const { name, keyPath, createIndexs } = params;
  try {
    // IDB数据库未链接/打开，直接抛错
    if (!Vue.prototype.IDB_T) throw `创建${name}表失败:IDB数据库未链接`;

    // 判断是否有 表名为 name的表；没有就新增一张
    if (!Vue.prototype.IDB_T?.objectStoreNames.contains(name)) {
      // 创建表，并设置 主键 keyPath
      const objectStore = Vue.prototype.IDB_T?.createObjectStore(name, {
        keyPath: keyPath,
      });
      // createIndex 为新建索引，后续就可以通过索引查询数据；
      // 索引名称、索引所在的属性、配置对象（说明该属性是否包含重复的值）。
      createIndexs?.forEach((item) => {
        objectStore.createIndex(item.name, item.attrName, {
          ...item.setting,
        });
      });

      // Notify.create({
      //   message: `创建${name}表成功`,
      //   color: "teal",
      // });
    } else {
      Notify.create({
        message: `已经存在${name}表`,
        color: "warning",
      });
    }
  } catch (error) {
    Notify.create({
      message: `${error}`,
      color: "warning",
    });
  }
};

/**
 * 增加IDB数据
 * @param   {string}    storeName 表名
 * @param   {any}       rowData   添加的具体数据
 * @param   {function}  callback  回调函数
 * @param   {number}    opType    操作模式（"只读"--readonly或"读写"--readwrite）
 */
export const DB_addData = (storeName, rowData, callback, opType = "readwrite") => {
  try {
    if (!Vue.prototype.IDB_T) throw '增加数据失败:IDB数据库未链接';
    if (!rowData) throw '未获取到数据';

    // 注意须在data.value有值的情况下操作
    const objectStore = Vue.prototype.IDB_T
      // 发起事务 指定表格名称和操作模式（"只读"--readonly或"读写"--readwrite）
      .transaction([storeName], opType)
      // 选择表对象
      .objectStore(storeName);

    // 添加具体数据
    const request = objectStore.add(rowData);

    // console.log('request :>> ', request);

    request.onsuccess = function (event) {
      const res = {
        status: 'success',
        message: '添加数据成功',
        data: null,
      }
      callback?.(res)
    };

    request.onerror = function (event) {
      const res = {
        status: 'fail',
        message: '添加数据失败',
        data: null,
      }
      callback?.(res)
    };
  } catch (error) {
    const res = {
      status: 'fail',
      message: `${error}`,
      data: null,
    }
    callback?.(res)
  }
};

/**
 * 修改IDB数据
 * @param   {string}    storeName 表名
 * @param   {any}       rowData   修改的具体数据
 * @param   {function}  callback  回调函数
 * @param   {number}    opType    操作模式（"只读"--readonly或"读写"--readwrite）
 */
export const DB_updateData = (storeName, rowData, callback, opType = "readwrite") => {
  try {
    if (!Vue.prototype.IDB_T) throw '修改数据失败:IDB数据库未链接';
    if (!rowData) throw '未获取到数据';

    // 注意须在data.value有值的情况下操作
    const objectStore = Vue.prototype.IDB_T
      // 发起事务 指定表格名称和操作模式（"只读"--readonly或"读写"--readwrite）
      .transaction([storeName], opType)
      // 选择表对象
      .objectStore(storeName);

    // 添加具体数据
    const request = objectStore.put(rowData);

    // console.log('request :>> ', request);

    request.onsuccess = function (event) {
        const res = {
          status: 'success',
          message: '修改数据成功',
          data: null,
        }
        callback?.(res)
    };

    request.onerror = function (event) {
      const res = {
        status: 'fail',
        message: '修改数据失败',
        data: null,
      }
      callback?.(res)
    };
  } catch (error) {
    const res = {
      status: 'fail',
      message: `${error}`,
      data: null,
    }
    callback?.(res)
  }
};

/**
 * 获取IDB对应表所有数据
 * @param   {string}    storeName 表名
 * @param   {function}  callback  回调方法
 * @return  {any}                 对应表所有的数据
 */
export const DB_getAllData = (storeName, callback) => {
  try {
    if (!Vue.prototype.IDB_T) throw "查询数据失败:IDB数据库未链接";
    // 最终结果
    const res = [];
    // 获取数据库的表对象
    const objectStore =
      Vue.prototype.IDB_T?.transaction(storeName).objectStore(storeName);
    // 游标
    objectStore.openCursor().onsuccess = (event) => {
      const cursor = event.target?.result;

      if (cursor) {
        res.push(cursor.value);
        cursor.continue();
      } else {
        // console.log("获取数据完成 : >>", res);
        const result = {
          status: "success",
          data: res,
          message: `获取数据成功`,
        };
        callback?.(result);
      }
    };
  } catch (error) {
    const result = {
      status: "fail",
      data: null,
      message: `${error}`,
    };
    callback?.(result);
  }
};

/**
 * 通过主键读取数据
 * @param { string } storeName  表名
 * @param { string } keyPathVal 主键键值
 * @param { function } callback  回调函数；参数status
 * @return { any } 通过主键读取数据
 */
export const DB_getDataByKey = (storeName, keyPathVal, callback) => {
  try {
    if (!Vue.prototype.IDB_T) {
      const res = {
        status: "fail",
        data: null,
        message: `查询数据失败:IDB数据库未链接`,
      };
      callback?.(res);
      return;
    }
    const transaction = Vue.prototype.IDB_T?.transaction([storeName]); // 事务
    const objectStore = transaction?.objectStore(storeName); // 仓库对象
    const request = objectStore?.get(keyPathVal); // 通过主键获取数据

    request.onerror = function (event) {
      const res = {
        status: "fail",
        data: null,
        message: "查询数据失败",
      };
      callback?.(res);
    };

    request.onsuccess = function (event) {
      // console.log('主键查询结果: ', request.result);
      const res = {
        status: "success",
        data: request.result,
        message: "成功",
      };
      callback?.(res);
    };
  } catch (error) {
    const res = {
      status: "fail",
      data: null,
      message: `${error}`,
    };
    callback?.(res);
  }
};


/** 
 * 删除表数据
 * @param { string }  storeName   表名
 * @param { string }  keyPathVal  主键键值
 */
export const DB_deleteByKey = (storeName, keyPathVal) => {
  try {
    if (!Vue.prototype.IDB_T) throw `删除数据失败:IDB数据库未链接`;
    var request = Vue.prototype.IDB_T
      .transaction([storeName], 'readwrite')
      .objectStore(storeName)
      .delete(keyPathVal);

    request.onsuccess = function (event) {
      Notify.create({
        message: '数据删除成功',
        color: 'teal',
      });
    };
  } catch (error) {
    Notify.create({
      message: `${error}`,
      color: 'warning',
    });
  }
};
