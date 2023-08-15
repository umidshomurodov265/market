<script setup>
import { useRouter, useRoute } from "vue-router";
import { CartsService } from "@/ApiServices/Carts/carts.service.js";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

const router = useRouter();
const route = useRoute();
const store = useStore();
const goBack = () => {
  router.go(-1);
};
function ToastError(data) {
  toast.error(data.msg, {
    autoClose: 1000,
  });
}
function ToastSuccess(data) {
  toast.success(data.msg, {
    autoClose: 1000,
  });
}
const items = ref({});
const products = ref([]);
const user = JSON.parse(localStorage.getItem("UserInfo"));
const GetCartsOfUser = async () => {
  try {
    const res = await CartsService.GetCartsOfUser(user.id);
    console.log(res.data.carts);
    items.value = res.data.carts[0];
    localStorage.setItem("totalQuantity", res.data.carts[0].totalQuantity);
    products.value = res.data.carts[0].products;
  } catch (err) {
    console.log(err.message);
  }
};
onMounted(async () => {
  try {
    await GetCartsOfUser();
  } catch (err) {
    console.log(err);
  }
});
</script>

<template>
  <div class="md:container md:mx-auto pb-4">
    <h4
      class="text-[18px] text-gray-400 font-bold text-center mb-5 shadow p-1 rounded"
    >
      Cart
    </h4>
    <div class="flex justify-between">
      <router-link
        to="/explore/create/employee"
        class="text-[12px] inline-flex items-center px-3 py-2 mb-4 text-sm font-medium text-center text-white bg-[#42aae6] hover:bg-[#42aae6] rounded focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >Total : {{ items.totalQuantity }}
      </router-link>

      <router-link class="" to="" @click="goBack">
        <el-radio-button label="top">
          <i class="mr-3 fa-solid fa-arrow-left fa-sm" style="color: #111"></i>
          Back</el-radio-button
        >
      </router-link>
    </div>

    <div class="cart-box">
      <div
        v-for="product in products"
        :key="product.id"
        class="flex justify-between flex-wrap p-4 shadow-sm border-t-2 rounded-md"
      >
        <div class="">
          <div class="flex gap-4 flex-wrap">
            <div class="rounded-lg">
              <img
                class="w-[120px] h-[120px] rounded-lg"
                src="https://t4.ftcdn.net/jpg/03/01/72/99/240_F_301729909_pioOp9a9bwGeXbdMfE1sjJnqtLxGmnFS.jpg"
                alt=""
              />
            </div>
            <div class="w-[200px]">
              <div class="text-gray-900 font-semibold mb-2">
                {{ product.title }}
              </div>

              <div class="flex gap-2 flex-wrap">
                <div class="flex space-x-2 w-[150px] p-2 bg-gray-50 rounded-lg">
                  <svg
                    class="flex-shrink-0 mt-1 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>

                  <p class="ml-6 text-[14px] text-gray-700 font-semibold">
                    Discount : {{ product.discountPercentage }}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-lg flex gap-8 text-center">
          <div class="mt-4">
            <button
              class="text-bold inline-flex items-center mt-2 text-white bg-[#2cce7d] hover:bg-[#36d887] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-3 py-2 text-center"
            >
              +
            </button>
          </div>
          <div class="mt-7 font-semibold">
            {{ product.quantity }}
          </div>
          <div class="mt-4">
            <button
              class="text-bold inline-flex items-center mt-2 text-white bg-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-[15px] py-2 text-center"
            >
              -
            </button>
          </div>
        </div>
        <div>
          <div class="flex space-x-2 w-[150px] p-2 mt-1 bg-gray-50 rounded-lg">
            <svg
              class="flex-shrink-0 mt-1 w-3.5 h-3.5 text-green-500 dark:text-green-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>

            <p class="ml-6 text-[14px] text-gray-700 font-semibold">
              Price: {{ product.price }}$
            </p>
          </div>
          <div class="flex space-x-2 w-[150px] p-2 mt-1 bg-gray-50 rounded-lg">
            <svg
              class="flex-shrink-0 mt-1 w-3.5 h-3.5 text-green-500 dark:text-green-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>

            <p class="ml-6 text-[14px] text-gray-700 font-semibold">
              Discount : {{ product.discountedPrice }}$
            </p>
          </div>
          <div class="flex space-x-2 w-[150px] p-2 mt-1 bg-gray-50 rounded-lg">
            <svg
              class="flex-shrink-0 mt-1 w-3.5 h-3.5 text-green-500 dark:text-green-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>

            <p class="ml-6 text-[14px] text-gray-900 font-bold">
              Total : {{ product.total }}$
            </p>
          </div>
        </div>
      </div>
    </div>

    <div
      class="count box-content bg-gray-100 mt-2 p-4 rounded-lg mb-4 md:grid md:grid-cols-4 gap-4 sm:flex sm:space-y-2 sm:flex-wrap"
    >
      <div>
        <div class="flex space-x-2 mt-2 w-full p-2 px-3 bg-gray-50 rounded-lg">
          <svg
            class="flex-shrink-0 mt-1 w-3.5 h-3.5 text-green-500 dark:text-green-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 12"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5.917 5.724 10.5 15 1.5"
            />
          </svg>

          <p class="ml-6 text-[14px] text-gray-700 font-semibold">
            Total Products : {{ items.totalProducts }}
          </p>
        </div>
      </div>
      <div>
        <div class="flex space-x-2 w-full px-2 p-2 bg-gray-50 rounded-lg">
          <svg
            class="flex-shrink-0 mt-1 w-3.5 h-3.5 text-green-500 dark:text-green-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 12"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5.917 5.724 10.5 15 1.5"
            />
          </svg>

          <p class="ml-6 text-[14px] text-gray-700 font-semibold">
            Total Quantity : {{ items.totalQuantity }}
          </p>
        </div>
      </div>
      <div>
        <div class="flex space-x-2 w-full p-2 px-2 bg-gray-50 rounded-lg">
          <svg
            class="flex-shrink-0 mt-1 w-3.5 h-3.5 text-green-500 dark:text-green-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 12"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5.917 5.724 10.5 15 1.5"
            />
          </svg>

          <p class="ml-6 text-[14px] text-gray-700 font-semibold">
            Discounted Total : {{ items.discountedTotal }}%
          </p>
        </div>
      </div>
      <div>
        <div class="flex space-x-2 w-full p-2 px-2 bg-gray-50 rounded-lg">
          <svg
            class="flex-shrink-0 mt-1 w-3.5 h-3.5 text-green-500 dark:text-green-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 12"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5.917 5.724 10.5 15 1.5"
            />
          </svg>

          <p class="ml-6 font-bold text-[14px] text-gray-700">
            Total price : {{ items.total }}$
          </p>
        </div>
      </div>

      <div>
        <div
          class="inline-flex items-center cursor-pointer text-white bg-[#42aae6] hover:bg-[#42aae6] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-24 py-2 text-center"
        >
          <p class="text-white font-bold text-[14px]">Payment</p>
        </div>
      </div>
    </div>
  </div>
</template>
