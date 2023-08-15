<script setup>
import { useRouter, useRoute } from "vue-router";
import { ProductsService } from "@/ApiServices/Products/products.service.js";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
const router = useRouter();
const route = useRoute();
const store = useStore();
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
const items = ref([]);
const goBack = () => {
  router.go(-1);
};

const Get = async () => {
  store.commit("setLoading", true, { root: true });
  try {
    const res = await ProductsService.Get(route.params.id);
    items.value = res.data;
    console.log(res.data);

    store.commit("setLoading", false, { root: true });
  } catch (err) {
    console.log(err.message);
    store.commit("setLoading", false, { root: true });
  }
};

const categoryOpions = ref([]);
const GetCategoriesList = async () => {
  store.commit("setLoading", true, { root: true });
  try {
    const res = await ProductsService.GetCategoriesList();
    categoryOpions.value = res.data;
    store.commit("setLoading", false, { root: true });
  } catch (err) {
    console.log(err.message);
    store.commit("setLoading", false, { root: true });
  }
};

const CreateProduct = async () => {
  if (
    items.value.brand &&
    items.value.title &&
    items.value.category &&
    items.value.price &&
    items.value.discountPercentage &&
    items.value.rating &&
    items.value.stock &&
    items.value.thumbnail &&
    items.value.images &&
    items.value.description
  ) {
    try {
      if (route.params.id > 0) {
        const res = await ProductsService.Update(items.value, route.params.id);
        ToastSuccess({ msg: "Ma'lumot yangilandi !" });
      } else if (route.params.id == "add") {
        const res = await ProductsService.Add(items.value);
        console.log(items.value);
        ToastSuccess({ msg: "Ma'lumot qo'shildi !" });
        setTimeout(() => {
          router.push("/explore");
        }, 2000);
      }
    } catch (err) {
      return ToastError({ msg: err.message });
    }
  } else {
    return ToastError({ msg: "Fill all fields!" });
  }
};

onMounted(() => {
  if (route.params.id > 0) {
    Get();
  }

  GetCategoriesList();
});
const labelPosition = ref("top");
</script>

<template>
  <div class="mb-10 pb-2 container admin-panel">
    <div class="admin-header">
      <h4
        class="text-[18px] text-gray-400 font-bold text-center mb-5 shadow p-1 rounded"
      >
        {{ route.params.id == "add" ? "Create product" : "Edit Product" }}
      </h4>

      <div class="p-5 mb-5 shadow-md mt-8 bg-white rounded">
        <el-form
          :label-position="labelPosition"
          status-icon
          label-width="120px"
          class="demo-ruleForm"
          @submit.prevent=""
        >
          <div class="grid grid-cols-4 gap-4">
            <div class="mb-6">
              <label
                for=""
                class="block mb-2 text-[13px] font-medium text-gray-900 dark:text-white"
                >Title
              </label>
              <el-form-item>
                <el-input
                  class="w-[100%]"
                  v-model="items.title"
                  clearable
                  placeholder="title"
                />
              </el-form-item>
            </div>
            <div class="mb-6">
              <label
                for=""
                class="block mb-2 text-[13px] font-medium text-gray-900 dark:text-white"
                >Brand name
              </label>
              <el-form-item>
                <el-input
                  required
                  class="w-[100%]"
                  v-model="items.brand"
                  clearable
                  placeholder="Apple.."
                />
              </el-form-item>
            </div>
            <div class="mb-6 col-span-1">
              <label
                name=""
                for=""
                class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white"
                >Category</label
              >
              <el-form-item>
                <el-select
                  required
                  v-model="items.category"
                  clearable
                  class="w-[100%]"
                  placeholder="Select category"
                >
                  <el-option
                    v-for="item of categoryOpions"
                    :key="item.value"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div class="mb-6">
              <label
                for=""
                class="block mb-2 text-[13px] font-medium text-gray-900 dark:text-white"
                >Price ($)
              </label>
              <el-form-item>
                <el-input
                  type="number"
                  v-model="items.price"
                  clearable
                  placeholder="999.... $"
                />
              </el-form-item>
            </div>

            <div class="mb-6">
              <label
                for=""
                class="block mb-2 text-[13px] font-medium text-gray-900 dark:text-white"
                >Discount (%)
              </label>
              <el-form-item>
                <el-input
                  v-model="items.discountPercentage"
                  clearable
                  type="number"
                  placeholder="9.99...%"
                />
              </el-form-item>
            </div>
            <div class="mb-6">
              <label
                for=""
                class="block mb-2 text-[13px] font-medium text-gray-900 dark:text-white"
                >Rating
              </label>
              <el-form-item>
                <el-input
                  type="number"
                  v-model="items.rating"
                  clearable
                  placeholder="4.99..."
                />
              </el-form-item>
            </div>
            <div class="mb-6">
              <label
                for=""
                class="block mb-2 text-[13px] font-medium text-gray-900 dark:text-white"
                >Stock (%)
              </label>
              <el-form-item>
                <el-input
                  :min="1"
                  :max="100"
                  type="number"
                  v-model="items.stock"
                  clearable
                  placeholder="99.9...%"
                />
              </el-form-item>
            </div>
            <div class="mb-6">
              <label
                for=""
                class="block mb-2 text-[13px] font-medium text-gray-900 dark:text-white"
                >Thumbnail
              </label>
              <el-form-item>
                <el-input
                  v-model="items.thumbnail"
                  clearable
                  placeholder="https://i.dummyjson.com/data/products/1/thumbnail.jpg"
                />
              </el-form-item>
            </div>
            <div>
              <div class="mb-6 col-span-4">
                <label
                  class="block mb-3 text-[13px] font-medium text-gray-900 dark:text-white"
                  >Images
                </label>
                <el-form-item>
                  <el-select
                    style="width: 250px"
                    v-model="items.images"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    :reserve-keyword="false"
                    placeholder="Put through the image address "
                  >
                    <el-option
                      v-for="item in items.images"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
              </div>
            </div>

            <div class="mb-6 col-span-3">
              <label
                class="block mb-3 text-[13px] font-medium text-gray-900 dark:text-white"
                >Description</label
              >
              <el-form-item>
                <el-input
                  v-model="items.description"
                  maxlength="200"
                  placeholder="typing..."
                  show-word-limit
                  type="textarea"
                />
              </el-form-item>
            </div>
          </div>

          <div class="mt-6 flex justify-end gap-6">
            <div>
              <label
                for=""
                class="block mb-2 text-[13px] font-medium text-gray-900 dark:text-white"
              ></label>
              <el-form-item>
                <el-button type="primary" @click="CreateProduct"
                  >Save</el-button
                >
                <el-button @click="router.go(-1)">Back</el-button>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style></style>
