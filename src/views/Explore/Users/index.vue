<script setup>
import { useRouter, useRoute } from "vue-router";
import { UsersService } from "@/ApiServices/Usere/users.service";
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
    LimitAndSkipUsers();
  } catch (err) {
    console.log(err);
  }
};

const handleSizeChange = (limit) => {
  return (limit = 12);
};
const handleCurrentChange = (skip) => {
  ext.value.skip = skip;
  ext.value.limit = 12;
  LimitAndSkipUsers();
  return skip;
};
const pageSize = ref("");
const Total = ref("");
const filter = ref({
  firstName: "",
  lastName: "",
  hair: {
    color: "",
  },
});
const search = ref("");
const Search = async () => {
  const res = await UsersService.SearchUsers(search.value);
  items.value = res.data.users;
  total.value = res.data.total;
  Total.value = res.data.total;
};
const Filter = async () => {
  if (
    filter.value.firstName ||
    filter.value.lastName ||
    filter.value.hair.color
  ) {
    const res = await UsersService.FilterUsers(filter.value);
    items.value = res.data.users;
    total.value = res.data.total;
    Total.value = res.data.total;
  }
  LimitAndSkipUsers();
};
const ext = ref({
  skip: 1,
  total: 100,
  limit: 12,
});
const LimitAndSkipUsers = async () => {
  store.commit("setLoading", false, { root: true });
  try {
    const res = await UsersService.LimitAndSkipUsers(ext.value);
    items.value = res.data.users;
    total.value = res.data.total;
    store.commit("setLoading", true, { root: true });
  } catch (err) {
    console.log(err.message);
  }
};
const tabPosition = ref("top");
function MainInfo() {
  isMainInfo.value = true;
  isAddress.value = false;
  isBank.value = false;
  isCompany.value = false;
}
function Address() {
  isMainInfo.value = false;
  isAddress.value = true;
  isBank.value = false;
  isCompany.value = false;
}
function Bank() {
  isAddress.value = false;
  isMainInfo.value = false;
  isBank.value = true;
  isCompany.value = false;
}
function Company() {
  isAddress.value = false;
  isMainInfo.value = false;
  isBank.value = false;
  isCompany.value = true;
}
const isMainInfo = ref(true);
const isAddress = ref(false);
const isCompany = ref(false);
const isBank = ref(false);
const items = ref([]);
const total = ref("");
const GetList = async () => {
  try {
    const res = await UsersService.GetList();
    items.value = res.data.users;
    total.value = res.data.total;
  } catch (err) {
    console.log(err.message);
  }
};
const DeleteUser = async (id) => {
  try {
    const res = await UsersService.Delete(id);
    ToastSuccess({ msg: "User deleted successfully!" });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (err) {
    ToastError({ msg: err.message });
  }
};
onMounted(async () => {
  try {
    await GetList();
  } catch (err) {
    console.log(err);
  }
});
</script>

<template>
  <div class="pb-5">
    <h4
      class="text-[18px] text-gray-400 font-bold text-center mb-5 shadow p-1 rounded"
    >
      Users
    </h4>
    <div class="flex justify-between">
      <router-link
        to="/explore/create/employee"
        class="text-[12px] inline-flex items-center px-3 py-2 mb-4 text-sm font-medium text-center text-white bg-[#42aae6] hover:bg-[#42aae6] rounded focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >Total : {{ total }}</router-link
      >
      <div class="flex justify-between gap-4">
        <router-link
          to="/explore/users"
          class="inline-flex text-[12px] items-center px-3 py-2 mb-4 text-sm font-medium text-center text-white bg-[#42aae6] hover:bg-[#42aae6] rounded focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >+ Add</router-link
        >
        <router-link class="" to="" @click="router.go(-1)">
          <el-radio-button label="top">
            <i
              class="mr-3 fa-solid fa-arrow-left fa-sm"
              style="color: #111"
            ></i>
            Back</el-radio-button
          >
        </router-link>
      </div>
    </div>

    <form
      class="filter-box md:grid md:grid-cols-4 gap-1 rounded shadow-md sm:flex sm:flex-wrap p-4 mt-1 mb-4"
    >
      <div class="tabs col-span-full mt-2 border-b-[1px]">
        <el-radio-group v-model="tabPosition" style="margin-bottom: 10px">
          <el-radio-button @click="MainInfo()" label="top"
            >Main info</el-radio-button
          >
          <el-radio-button @click="Address()" label="right"
            >Address</el-radio-button
          >
          <el-radio-button @click="Company()" label="bottom"
            >Company</el-radio-button
          >
          <el-radio-button @click="Bank()" label="left">Bank</el-radio-button>
        </el-radio-group>
      </div>
      <div class="mb-2 col-span-1">
        <label
          name="resul"
          for=""
          class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white"
          >Firstname</label
        >
        <el-input
          @Input="Filter"
          clearable
          class="w-[100%]"
          v-model="filter.firstName"
          placeholder="Firstname"
        />
      </div>
      <div class="mb-2 col-span-1">
        <label
          name="resul"
          for=""
          class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white"
          >Lastname</label
        >
        <el-input
          @Input="Filter"
          clearable
          class="w-[100%]"
          v-model="filter.lastName"
          placeholder="Lastname"
        />
      </div>
      <div class="mb-2 col-span-1 sm:w-100">
        <label
          name="resul"
          for=""
          class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white"
          >Hair color</label
        >
        <el-input
          @Input="Filter"
          clearable
          class="w-[100%]"
          v-model="filter.hair.color"
          placeholder="Brown"
        />
      </div>
      <div class="flex justify-between gap-1">
        <div class="mb-2 col-span-2">
          <label
            name="resul"
            for=""
            class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white"
            >Search</label
          >
          <el-input
            @Input="Search"
            clearable
            class="w-[100%]"
            v-model="search"
            placeholder="Search..."
          />
        </div>
        <div class="flex mt-[18px] gap-2">
          <div>
            <label
              for=""
              class="block mb-2 text-[13px] font-medium text-gray-900 dark:text-white"
            ></label>
            <button
              @click="ReloadPage"
              class="text-[12px] cursor-pointer inline-flex items-center font-medium text-center text-white bg-[#42aae6] hover:bg-[#42aae6] rounded focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <i
                class="fa-solid fa-arrows-rotate fa-sm box-border px-[30px] py-[15px]"
                style="color: #ffffff"
              ></i>
            </button>
          </div>
        </div>
      </div>
    </form>

    <div class="shadow-md rounded min-h-[15px] bg-white">
      <div class="pb-5 inline-grid min-h-[15px]">
        <!-- // Main-Info   -->
        <el-table
          v-show="isMainInfo"
          class="Main-Info w-full min-h-[15px]"
          header-align="center"
          empty-text="No Date... "
          :default-sort="[
            { prop: 'firstName', order: 'descending' },
            { prop: 'lastName', order: 'descending' },

            { prop: 'maidenName', order: 'descending' },

            { prop: 'gender', order: 'descending' },
            { prop: 'age', order: 'descending' },
          ]"
          :data="items"
          border
          style="width: 100%"
          height="400"
        >
          <el-table-column
            header-align="center"
            align="center"
            type="index"
            prop="index"
            fixed="left"
            label="№"
            width="80"
          />

          <el-table-column
            header-align="center"
            sortable
            prop="firstName"
            label="First Name"
            width="200"
          />
          <el-table-column
            header-align="center"
            sortable
            prop="lastName"
            label="Last Name "
            width="250"
          />

          <el-table-column
            header-align="center"
            sortable
            prop="maidenName"
            label="Short Name"
            width="200"
          />
          <el-table-column
            header-align="center"
            align="center"
            sortable
            prop="gender"
            label="Gender"
            width="200"
          />
          <el-table-column
            header-align="center"
            align="center"
            sortable
            prop="hair.color"
            label="Hair Color"
            width="200"
          />
          <el-table-column
            header-align="center"
            align="center"
            sortable
            prop="age"
            label="Age"
            width="200"
          />

          <el-table-column
            fixed="right"
            prop="id"
            label="Actions"
            width="150"
            header-align="center"
            align="center"
          >
            <template #default="scope">
              <!-- scope.row.id -->
              <router-link
                to="/explore/users"
                class="inline-flex items-center mt-4 text-white bg-[#42aae6] hover:bg-[#42aae6] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
              >
                <i class="fa-solid fa-pen fa-xs text-black"></i>
              </router-link>
              <router-link
                :to="`/explore/users`"
                class="inline-flex ml-2 items-center mt-4 text-white bg-yellow-300 hover:bg-yellow-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
              >
                <i class="text-black fa-regular fa-eye fa-xs"></i>
              </router-link>
              <router-link
                to=""
                @click="DeleteUser(scope.row.id)"
                class="inline-flex items-center mt-4 ml-2 text-white bg-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
              >
                <i class="text-black fa-sharp fa-solid fa-trash fa-xs"></i>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
        <!-- // -->
        <!-- Adress -->
        <el-table
          v-show="isAddress"
          class="Address w-full min-h-[15px]"
          header-align="center"
          empty-text="No Date... "
          :default-sort="[
            { prop: 'firstName', order: 'descending' },
            { prop: 'address', order: 'descending' },
            { prop: 'city', order: 'descending' },
            { prop: 'coordinates.lat', order: 'descending' },
            { prop: 'coordinates.lng', order: 'descending' },
            { prop: 'domain', order: 'descending' },
            { prop: 'university', order: 'descending' },
            { prop: 'macAddress', order: 'descending' },
            { prop: 'ip', order: 'descending' },
            { prop: 'postalCode', order: 'descending' },
            { prop: 'state', order: 'descending' },
          ]"
          :data="items"
          border
          style="width: 100%"
          height="400"
        >
          <el-table-column
            header-align="center"
            align="center"
            type="index"
            prop="index"
            fixed="left"
            label="№"
            width="80"
          />
          <el-table-column
            header-align="center"
            sortable
            prop="firstName"
            label="Firstname"
            width="200"
          />

          <el-table-column
            header-align="center"
            sortable
            prop="address.address"
            label="Address"
            width="200"
          />
          <el-table-column
            header-align="center"
            sortable
            prop="address.city"
            label="City"
            width="250"
          />

          <el-table-column
            header-align="center"
            sortable
            prop="university"
            label="University"
            width="200"
          />
          <el-table-column
            header-align="center"
            align="left"
            sortable
            prop="domain"
            label="Domain"
            width="200"
          />
          <el-table-column
            header-align="center"
            align="left"
            sortable
            prop="macAddress"
            label="Mac Address"
            width="200"
          />
          <el-table-column
            header-align="center"
            align="center"
            sortable
            prop="ip"
            label="IP"
            width="200"
          />
          <el-table-column
            header-align="center"
            align="left"
            sortable
            prop="address.coordinates.lat"
            label="Coordinates (lat)"
            width="200"
          />
          <el-table-column
            header-align="center"
            align="left"
            sortable
            prop="address.coordinates.lng"
            label="Coordinates (lng)"
            width="200"
          />
          <el-table-column
            header-align="center"
            align="left"
            sortable
            prop="address.postalCode"
            label="Postal Code"
            width="200"
          />
          <el-table-column
            header-align="center"
            align="left"
            sortable
            prop="address.state"
            label="State"
            width="200"
          />

          <el-table-column
            fixed="right"
            prop="id"
            label="Action"
            width="150"
            header-align="center"
            align="center"
          >
            <template #default="scope">
              <router-link
                :to="`explore/products/edit/${scope.row.id}`"
                class="inline-flex items-center mt-4 text-white bg-[#42aae6] hover:bg-[#42aae6] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
              >
                <i class="fa-solid fa-pen fa-xs text-black"></i>
              </router-link>
              <router-link
                :to="`explore/products/view/${scope.row.id}`"
                class="inline-flex ml-2 items-center mt-4 text-white bg-yellow-300 hover:bg-yellow-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
              >
                <i class="text-black fa-regular fa-eye fa-xs"></i>
              </router-link>
              <router-link
                to=""
                @click="deleteProduct(scope.row.id)"
                class="inline-flex items-center mt-4 ml-2 text-white bg-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
              >
                <i class="text-black fa-sharp fa-solid fa-trash fa-xs"></i>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
        <!-- //// -->
        <!-- Company -->
        <el-table
          v-show="isCompany"
          class="Company w-full min-h-[15px]"
          header-align="center"
          empty-text="No Date... "
          :default-sort="[
            { prop: 'firstName', order: 'descending' },
            { prop: 'address', order: 'descending' },
            { prop: 'city', order: 'descending' },
            { prop: 'coordinates.lat', order: 'descending' },
            { prop: 'coordinates.lng', order: 'descending' },
            { prop: 'department', order: 'descending' },
            { prop: 'name', order: 'descending' },
            { prop: 'title', order: 'descending' },
            { prop: 'ein', order: 'descending' },
            { prop: 'ssn', order: 'descending' },
            { prop: 'userAgent', order: 'descending' },
          ]"
          :data="items"
          border
          style="width: 100%"
          height="400"
        >
          <el-table-column
            header-align="center"
            align="center"
            type="index"
            prop="index"
            fixed="left"
            label="№"
            width="80"
          />
          <el-table-column
            header-align="center"
            sortable
            prop="firstName"
            label="Firstname"
            width="200"
          />

          <el-table-column
            header-align="center"
            sortable
            prop="company.address.address"
            label="Address"
            width="200"
          />
          <el-table-column
            header-align="center"
            sortable
            prop="company.address.city"
            label="City"
            width="250"
          />

          <el-table-column
            header-align="center"
            sortable
            prop="company.department"
            label="Department"
            width="200"
          />
          <el-table-column
            header-align="center"
            align="left"
            sortable
            prop="company.name"
            label="Name"
            width="200"
          />
          <el-table-column
            header-align="center"
            align="left"
            sortable
            prop="company.title"
            label="Title"
            width="200"
          />
          <el-table-column
            header-align="center"
            align="left"
            sortable
            prop="userAgent"
            label="User Agency"
            width="200"
          />

          <el-table-column
            header-align="center"
            align="center"
            sortable
            prop="ein"
            label="EIN"
            width="200"
          />
          <el-table-column
            header-align="center"
            align="center"
            sortable
            prop="ssn"
            label="SSN"
            width="200"
          />
          <el-table-column
            header-align="center"
            align="left"
            sortable
            prop="company.address.coordinates.lat"
            label="Coordinates (lat)"
            width="200"
          />
          <el-table-column
            header-align="center"
            align="left"
            sortable
            prop="company.address.coordinates.lng"
            label="Coordinates (lng)"
            width="200"
          />
          <el-table-column
            header-align="center"
            align="left"
            sortable
            prop="company.address.postalCode"
            label="Postal Code"
            width="200"
          />
          <el-table-column
            header-align="center"
            align="left"
            sortable
            prop="company.address.state"
            label="State"
            width="200"
          />

          <el-table-column
            fixed="right"
            prop="id"
            label="Action"
            width="150"
            header-align="center"
            align="center"
          >
            <template #default="scope">
              <router-link
                :to="`explore/products/edit/${scope.row.id}`"
                class="inline-flex items-center mt-4 text-white bg-[#42aae6] hover:bg-[#42aae6] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
              >
                <i class="fa-solid fa-pen fa-xs text-black"></i>
              </router-link>
              <router-link
                :to="`explore/products/view/${scope.row.id}`"
                class="inline-flex ml-2 items-center mt-4 text-white bg-yellow-300 hover:bg-yellow-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
              >
                <i class="text-black fa-regular fa-eye fa-xs"></i>
              </router-link>
              <router-link
                to=""
                @click="deleteProduct(scope.row.id)"
                class="inline-flex items-center mt-4 ml-2 text-white bg-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
              >
                <i class="text-black fa-sharp fa-solid fa-trash fa-xs"></i>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
        <!-- //// -->
        <!-- Bank -->
        <el-table
          v-show="isBank"
          class="Bank w-full min-h-[15px]"
          header-align="center"
          empty-text="No Date... "
          :default-sort="[
            { prop: 'firstName', order: 'descending' },
            { prop: 'cardExpire', order: 'descending' },
            { prop: 'cardNumber', order: 'descending' },
            { prop: 'cardType', order: 'descending' },
            { prop: 'currency', order: 'descending' },
            { prop: 'iban', order: 'descending' },
          ]"
          :data="items"
          border
          style="width: 100%"
          height="400"
        >
          <el-table-column
            header-align="center"
            align="center"
            type="index"
            prop="index"
            fixed="left"
            label="№"
            width="80"
          />
          <el-table-column
            header-align="center"
            sortable
            prop="firstName"
            label="Firstname"
            width="200"
          />

          <el-table-column
            header-align="center"
            sortable
            prop="bank.cardType"
            label="Card Type"
            width="200"
          />
          <el-table-column
            header-align="center"
            sortable
            prop="bank.currency"
            label="Currency"
            width="250"
          />

          <el-table-column
            header-align="center"
            sortable
            prop="bank.cardExpire"
            label="Card Expire"
            width="200"
          />
          <el-table-column
            header-align="center"
            align="left"
            sortable
            prop="bank.cardNumber"
            label="Card Number"
            width="200"
          />
          <el-table-column
            header-align="center"
            align="left"
            sortable
            prop="bank.iban"
            label="Iban"
            width="200"
          />

          <el-table-column
            fixed="right"
            prop="id"
            label="Action"
            width="150"
            header-align="center"
            align="center"
          >
            <template #default="scope">
              <router-link
                :to="`explore/products/edit/${scope.row.id}`"
                class="inline-flex items-center mt-4 text-white bg-[#42aae6] hover:bg-[#42aae6] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
              >
                <i class="fa-solid fa-pen fa-xs text-black"></i>
              </router-link>
              <router-link
                :to="`explore/products/view/${scope.row.id}`"
                class="inline-flex ml-2 items-center mt-4 text-white bg-yellow-300 hover:bg-yellow-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
              >
                <i class="text-black fa-regular fa-eye fa-xs"></i>
              </router-link>
              <router-link
                to=""
                @click="deleteProduct(scope.row.id)"
                class="inline-flex items-center mt-4 ml-2 text-white bg-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
              >
                <i class="text-black fa-sharp fa-solid fa-trash fa-xs"></i>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
        <!-- //// -->

        <!-- // end -->
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
          :total="total"
          class="text-center text-green-600"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <div v-show="items" class="">
        <el-select
          @change="onChange(value)"
          v-model="value"
          class="p-2 w-[18%] m-auto"
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

<style></style>
