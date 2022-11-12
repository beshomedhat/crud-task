<!-- eslint-disable  -->
<template>
  <section>
    <legend><i class="fa-solid fa-file-circle-plus"></i> Add New Item</legend>
    <add-form @getFormData="addNewItem" :inputs_data="null" />
    <br />
    <legend><i class="fa-solid fa-list-check"></i> All Data Table</legend>
    <div class="p-3 table-container">
      <div id="table">
        <bootstrap-table
          id="all-data-table"
          :columns="columns"
          :options="options"
          class="table-striped"
        ></bootstrap-table>
      </div>
    </div>

    <!-- Delete Modal -->
    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="deleteModalLabel">
              <i class="fa-solid fa-triangle-exclamation text-danger"></i> Are
              you sure to delete this item
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
              @click="deleteItemById"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- edit Modal -->
    <button class="d-none" @click="setEditData" id="edit-btn">edit</button>
    <div
      class="modal fade"
      id="editModal"
      tabindex="-1"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="editModalLabel">
              <i class="fa-solid fa-file-pen"></i> Update form
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              id="close-edit"
            ></button>
          </div>
          <div class="modal-body">
            <add-form @getFormData="updateItem" :inputs_data="update_data" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<!-- eslint-disable  -->

<script>
/* eslint-disable */
// import jquery
import "@/plugins/jquery.js";
import $ from "jquery";

// import toastr for suc. and err. msgs.
import toastr from "toastr";

// import bootstrap table js, css & vue component
import * as bootstrapTable from "bootstrap-table";
import "bootstrap-table/dist/bootstrap-table.min.css";
import BootstrapTable from "bootstrap-table/dist/bootstrap-table-vue.min.js";

// import data services for apis
import DataService from "@/services/data-services.js";
import AddForm from "./add-form.vue";
var delete_item_id = null;
var update_item = null;

export default {
  components: {
    BootstrapTable,
    AddForm,
  },
  data() {
    return {
      delete_item_id: null,
      columns: [
        {
          title: "Item ID",
          field: "id",
        },
        {
          field: "arrivingArabicName",
          title: "Name AR",
        },
        {
          field: "arrivingEnglishName",
          title: "Name EN",
        },
        {
          field: "sort",
          title: "Sort",
        },
        {
          field: "action",
          title: "Actions",
          align: "center",
          formatter: function () {
            return `
            <button type="button" class="table-btn delete" data-bs-toggle="modal" data-bs-target="#deleteModal"><i class="fa-regular fa-trash-can"></i></button>
            <button type="button" class="table-btn update text-secondary" data-bs-toggle="modal" data-bs-target="#editModal"><i class="fa-regular fa-pen-to-square"></i></button>
            `;
          },
          events: {
            "click .delete": function (e, value, row) {
              delete_item_id = row.id;
            },
            "click .update": function (e, value, row) {
                update_item = row;
                document.getElementById("edit-btn").click()

            },
          },
        },
      ],
      update_data:null,
      options: {
        search: false,
        showColumns: true,
        ajax: this.getTableData,
        sidePagination: "server",
        pagination: true,
        pageSize: "10",
        pageList: "[2,5,10]",
      },
    };
  },
  methods: {
    getTableData(params) {
      let rows = params.data.limit;
      let page = params.data.offset / rows;
      DataService.getAllData(page, rows)
        .then((response) => {
          response.data;
          let table_data = {
            rows: response.data.data,
            total: response.data.totalCount,
          };
          params.success(table_data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteItemById() {
      var $table = $("#all-data-table");
      DataService.deleteItem(delete_item_id)
        .then((response) => {
          if (response.status == 200) {
            toastr.success("item deleted successfully!", "Delete");
            $table.bootstrapTable("refresh");
          } else {
            toastr.error("please, try again!", "Error");
          }
        })
        .catch((error) => {
          console.log(error);
          toastr.error("please, try again!", "Error");
        });
    },
    addNewItem(data) {
      var $table = $("#all-data-table");
      delete data.id
      DataService.addNewItem(data)
        .then((response) => {
          if (response.status == 200) {
            toastr.success("item added successfully!", "Add");
            $table.bootstrapTable("refresh");
          } else {
            toastr.error("please, try again!", "Error");
          }
        })
        .catch((error) => {
          console.log(error);
          toastr.error("please, try again!", "Error");
        });
    },
    updateItem(data) {
      var $table = $("#all-data-table");
      DataService.updateItem(data)
        .then((response) => {
          if (response.status == 200) {
            toastr.success("item updated successfully!", "Update");
            $table.bootstrapTable("refresh");
            document.getElementById("close-edit").click()
          } else {
            toastr.error("please, try again!", "Error");
          }
        })
        .catch((error) => {
          console.log(error);
          toastr.error("please, try again!", "Error");
        });
    },
    setEditData(){
        this.update_data = update_item
    }
  },
  mounted() {},
};
</script>

<style>
table {
  text-align: center;
}
th {
  color: white !important;
}
.table-container {
  background-color: var(--main);
  border-radius: 10px;
}
.active > .page-link,
.page-link.active {
  background-color: var(--sub) !important;
  border-color: var(--sub) !important;
  color: white !important;
}
.table-bordered {
  border: 0px solid transparent !important;
  border-bottom: 1px solid white !important;
  border-top: 1px solid white !important;
}
.dropdown-item.active,
.dropdown-item:active {
  background-color: var(--sub) !important;
}
.page-link {
  color: var(--sub) !important;
}
.table-btn {
  border: 0;
  background-color: white;
  border-radius: 5px;
  transition: scale 1s;
  color: #dc3545;
}
.table-btn:hover {
  background-color: #d9d9d9;
  scale: 1.1;
}
.toast-success {
  background-color: var(--main) !important;
}
.toast-error {
  background-color: #dc3545 !important;
}
</style>
