import axios from 'axios';
import { ElMessage } from 'element-plus';

// 创建 axios 实例（可选）
const request = axios.create({
  baseURL: '',
  timeout: 10000,
});

// 添加响应拦截器
request.interceptors.response.use(
  // 成功响应
  (response) => {
    return response;
  },
  // 错误响应
  (error) => {
    const { response } = error;

    if (response) {
      // 服务器返回了状态码（如 4xx, 5xx）
      switch (response.status) {
        case 400:
          console.error('请求参数错误');
          break;
        case 401:
          console.error('未授权，请重新登录');
          // 可跳转到登录页
          // window.location.href = '/login';
          break;
        case 403:
          console.error('拒绝访问');
          break;
        case 404:
          console.error('请求资源不存在');
          break;
        case 500:
          console.error('服务器内部错误');
          break;
        default:
          console.error(`请求失败：${response.status} ${response.statusText}`);
      }
    } else if (error.request) {
      // 请求已发出但无响应（如网络断开、超时）
      ElMessage.error('网络错误或请求超时')
    } else {
      // 其他错误（如配置错误）
      console.error('请求配置错误:', error.message);
    }

    // 可选择是否继续抛出错误，让调用处处理
    return Promise.reject(error);
  }
);

export { request }