// import { useToast } from "vue-toastification";
import { ofetch } from 'ofetch'
// const toast = useToast();

export const useCustomFetch = (url: string, params: any) => {
  const instance = ofetch.create({
    // baseURL: "https://app.itoll.com/api/v1/",
    baseURL: 'https://operator-hub-interview.darkube.app/api/v1/',
    headers: {
      authorization: localStorage.getItem('auth._token.local') || ''
    },
    async onResponse({ request, response, options }) {
      const { message } = (response as any)?._data
      if (message && response.ok) {
        // toast.success(message, { hideProgressBar: true, rtl: true });
        console.log(message)
      }
    },
    async onResponseError({ request, response, options }) {
      if (response.status === 401) {
        localStorage.removeItem('auth._token.local')
      } else {
        const { message, errorMessage } = (response as any)?._data || 'خطای سرور'
        // toast.error(errorMessage || message, { hideProgressBar: true, rtl: true });
        console.log(message, errorMessage)
      }
    },

    async onRequest({ request, options }) {
      options.headers = new Headers(options.headers)
      options.headers.set('Authorization', localStorage.getItem('auth._token.local') || '')
    },
    async onRequestError() {
      console.log('[fetch request error]')
    }
  })
  return instance(url, params)
}
