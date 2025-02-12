"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  withCredentials: true, // Cookie gönderimi için gerekli.
});

// response interceptor dönen veriyi inceler
// ve önce mevcut isteği saklar, ardından status ya da response'u
// kontrol eder. 401 (Unauthorized) durumunda refresh-token'a istek atar.
// eğer refreshToken mevcutsa ve validse yeni accessToken NodeJS tarafında
// set edilir.
instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Yeni accessToken için istek atıyoruz.
        await instance.post(
          "user/refresh-token",
          {},
          { withCredentials: true }
        );

        // Orijinal isteği tekrar gönderiyoruz.
        return instance(originalRequest);
      } catch (refreshError) {
        console.error("Token yenileme başarısız:", refreshError);
        // Eğer token yenileme işlemi başarısızsa
        // kullanıcıyı auth sayfasına yönlendiriyoruz.
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const Page = () => {
  const loginUser = async () => {
    try {
      const response = await instance.post(
        "user/login",
        {
          username: "johndoeXYZ",
          password: "12345",
        },
        {
          withCredentials: true,
        }
      );

      console.log("Giriş başarılı:", response.data);
    } catch (error) {
      console.error("Giriş başarısız:");
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        // Eğer accessToken varsa, Authorization header'ını ekleyelim
        const response = await instance.post(
          "user/me",
          {},
          { withCredentials: true }
        );

        console.log("Kullanıcı Verisi:", response.data);
      } catch (error) {
        console.error("Veri alınamadı:", error);
      }
    };

    getUserData();
  }, []);

  return (
    <div>
      <Button onClick={loginUser}>Login</Button>
    </div>
  );
};

export default Page;
