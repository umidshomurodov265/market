<script setup>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { watch, computed, onMounted, ref } from "vue";
import { ElLoading } from "element-plus";
import { ProductsService } from "@/ApiServices/Products/products.service.js";
import { CartsService } from "@/ApiServices/Carts/carts.service.js";

import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
const user = JSON.parse(localStorage.getItem("UserInfo"));
function ToastError(data) {
  toast.error(data.msg, {
    autoClose: 4000,
  });
}
function ToastSuccess(data) {
  toast.success(data.msg, {
    autoClose: 4000,
  });
}
const router = useRouter();
const route = useRoute();
const store = useStore();
const loading = computed(() => {
  return store.state.loading;
});
const options = computed(() => {
  return store.state.options;
});
const discountOptions = ref([
  { text: "Yes", value: 1 },
  { text: "No", value: 0 },
]);
const onChange = (value) => {
  ext.value.limit = value;
  ext.value.skip = 1;
  try {
    LimitAndSkipProducts();
  } catch (err) {
    console.log(err);
  }
};
const product = {
  userId: user.id,
  products: [
    {
      id: "",
      quantity: 1,
    },
  ],
};
const AddProductToCart = async (id) => {
  console.log(id);
  product.products[0].id = id;
  try {
    const res = await CartsService.Add(product);
    ToastSuccess({ msg: "The product has been added to the cart!" });
  } catch (err) {
    ToastError({ msg: err.message });
  }
};

const total = ref();
const handleSizeChange = (limit) => {
  return (limit = 12);
};
const handleCurrentChange = (skip) => {
  ext.value.skip = skip;
  ext.value.limit = 12;
  LimitAndSkipProducts();
  return skip;
};
const filter = ref({
  skip: 1,
  total: 100,
  limit: 12,
  category: "",
  name: "",
  brand: "",
  price: "",
  artNumber: "",
  amount: "",
  discount: "",
});
const pageSize = ref("");
const items = ref([]);
const Total = ref("");
const ext = ref({
  skip: 1,
  total: 100,
  limit: 12,
});

const optionsCategories = ref();
const CategoriesAll = async () => {
  try {
    const res = await ProductsService.GetCategoriesList();
    optionsCategories.value = res.data;
  } catch (err) {
    console.log(err.message);
  }
};

const GetProductsOfCategory = async (category) => {
  store.commit("setLoading", false, { root: true });
  try {
    if (category) {
      const res = await ProductsService.GetProductsOfCategory(category);
      items.value = res.data.products;
      total.value = res.data.total;
      console.log(res.data);
      store.commit("setLoading", true, { root: true });
    } else {
      LimitAndSkipProducts();
    }
  } catch (err) {
    console.log(err.message);
  }
};

const LimitAndSkipProducts = async () => {
  store.commit("setLoading", false, { root: true });
  try {
    if (filter.value.brand) {
      const res = await ProductsService.LimitAndSkipProducts(filter.value);
      items.value = res.data.products;
      total.value = res.data.total;
      console.log(res.data);
      store.commit("setLoading", true, { root: true });
    } else {
      const res = await ProductsService.LimitAndSkipProducts(ext.value);
      items.value = res.data.products;
      total.value = res.data.total;
      Total.value = res.data.total;
      console.log(res.data);
      store.commit("setLoading", true, { root: true });
    }
  } catch (err) {
    console.log(err.message);
  }
};
const search = ref("");
async function SearchProducts() {
  try {
    if (search.value) {
      const res = await ProductsService.SearchProducts(search.value);
      items.value = res.data.products;
      Total.value = res.data.total;
    } else {
      LimitAndSkipProducts();
    }
  } catch (err) {
    console.log(err.message);
  }
}

const ProductsServiceGetList = async () => {
  try {
    const res = await ProductsService.GetList();
    items.value = res.data.products;
    Total.value = res.data.total;
  } catch (err) {
    console.log(err.message);
  }
};
const deleteProduct = async (id) => {
  try {
    const res = await ProductsService.Delete(id);
    ToastSuccess({ msg: "Product deleted successfully!" });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (err) {
    console.log(err.message);
  }
};

function ReloadPage() {
  store.commit("setLoading", true, { root: true });
  store.commit("setLoading", true, { root: true });
  setTimeout(() => {
    window.location.reload();
  }, 1000);
  store.commit("setLoading", false, { root: true });
}

onMounted(async () => {
  try {
    await LimitAndSkipProducts();
    await CategoriesAll();
  } catch (err) {
    console.log(err);
  }
});

////
</script>
<template>
  <div class="md:container md:mx-auto pb-8">
    <h4
      class="text-[18px] text-gray-400 font-bold text-center mb-5 shadow p-1 rounded"
    >
      Products
    </h4>
    <div class="flex justify-between">
      <router-link
        to="/explore/create/employee"
        class="text-[12px] inline-flex items-center px-3 py-2 mb-4 text-sm font-medium text-center text-white bg-[#42aae6] hover:bg-[#42aae6] rounded focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >Total : {{ Total }}
      </router-link>

      <router-link
        to="/explore/products/edit/add"
        class="inline-flex text-[12px] items-center px-3 py-2 mb-4 text-sm font-medium text-center text-white bg-[#42aae6] hover:bg-[#42aae6] rounded focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >+ Add</router-link
      >
    </div>

    <form
      class="filter-box md:grid md:grid-cols-3 gap-2 sm:flex sm:flex-wrap rounded shadow-md p-4 mt-1 mb-4"
    >
      <div class="mb-2 col-span-1">
        <label
          name="resul"
          class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white"
          >Brand</label
        >
        <el-input
          @input="LimitAndSkipProducts()"
          v-model="filter.brand"
          clearable
          class="w-[100%]"
          placeholder="Apple"
        />
      </div>

      <div class="mb-2 col-span-1">
        <label
          name=""
          for=""
          class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white"
          >Category</label
        >
        <el-select
          @change="GetProductsOfCategory(filter.category)"
          v-model="filter.category"
          clearable
          class="w-[100%]"
          placeholder="Select category"
        >
          <el-option
            v-for="item in optionsCategories"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>

      <div class="mb-2 col-span-1">
        <label
          name="resul"
          class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white"
          >Search</label
        >
        <el-input
          @input="SearchProducts()"
          clearable
          class="w-[100%]"
          v-model="search"
          placeholder="Search..."
        />
      </div>

      <div class="flex col-span-2 col-end-7 mt-[18px] gap-2">
        <div>
          <label
            for=""
            class="block mb-2 text-[13px] font-medium text-gray-900 dark:text-white"
          ></label>
          <button
            @click="ReloadPage"
            class="text-[12px] cursor-pointer px-[15px] inline-flex items-center font-medium text-center text-white bg-[#42aae6] hover:bg-[#42aae6] rounded focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <i
              class="fa-solid fa-arrows-rotate fa-sm px-[19px] py-[15px]"
              style="color: #ffffff"
            ></i>
          </button>
        </div>
      </div>
    </form>

    <div
      class="md:container mx-auto cards md:grid md:grid-flow-row-dense md:grid-cols-3 gap-6 sm:flex sm:flex-wrap sm:gap-4 rounded min-h-[15px] 4xl:grid-cols-4"
    >
      <div
        v-for="item in items"
        :key="item.id"
        class="max-w-xl box-content sm:grid-cols-1p xs:columns-1 xs:container sm:xs:columns-1 xl:xs:columns-1 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <a href="#">
          <img
            class="rounded-t-lg h-60 w-[100%]"
            :src="item.thumbnail"
            alt=""
          />
        </a>
        <div class="p-4 h-48">
          <a href="#">
            <h5
              class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              {{ item.title }}
            </h5>
          </a>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {{ item.description }}
          </p>
        </div>
        <div class="p-4 ml-4 mr-4 rounded flex justify-between bg-white shadow">
          <div
            class="mb-2 text- xl font-semibold text-gray-700 dark:text-gray-400"
          >
            Price : {{ item.price }}$
          </div>
          <div
            class="mb-2 text- xl font-semibold text-gray-700 dark:text-gray-400"
          >
            Discount: {{ item.discountPercentage }}%
          </div>
        </div>
        <div class="actions flex justify-between">
          <div class="p-4 mt-4">
            <el-rate
              v-model="item.rating"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            />
          </div>
          <div class="p-4">
            <router-link
              :to="`explore/products/edit/${item.id}`"
              class="inline-flex items-center mt-4 text-white bg-[#42aae6] hover:bg-[#42aae6] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
            >
              <i class="fa-solid fa-pen fa-xs text-black"></i>
            </router-link>
            <router-link
              :to="`explore/products/view/${item.id}`"
              class="inline-flex ml-2 items-center mt-4 text-white bg-yellow-300 hover:bg-yellow-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
            >
              <i class="text-black fa-regular fa-eye fa-xs"></i>
            </router-link>
            <router-link
              to=""
              @click="deleteProduct(item.id)"
              class="inline-flex items-center mt-4 ml-2 text-white bg-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
            >
              <i class="text-black fa-sharp fa-solid fa-trash fa-xs"></i>
            </router-link>
            <router-link
              @click="AddProductToCart(item.id)"
              to=""
              class="inline-flex ml-2 items-center mt-4 text-white bg-[#2cce7d] hover:bg-[#36d887] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
            >
              <i class="fa-solid fa-cart-plus fa-beat fa-xs"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div
      class="pagenation text-[12px] mt-4 py-4 text-center bg-white p-4 shadow hover:shadow-xl md:grid md:grid-cols-2 sm:flex sm:flex-wrap"
    >
      <div class="md:w-[30%] sm:w-[100%] m-auto">
        <el-pagination
          type="success"
          small
          background
          layout="prev, pager, next"
          :total="Total"
          class="pagenation mt-4 mb-3 text-center text-green-600"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <div v-show="items">
        <el-select
          @change="onChange(value)"
          v-model="value"
          class="m-2 w-[18%]"
          placeholder="100"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
  </div>
</template>

<style scoped>
.router-link a.router-link-exact-active {
  background: #2cce7d;
}
.pagenation {
  background: white;
}
.page {
  background: green;
}
</style>
