<template>
        <div class="br-pagebody">
            <div class="br-section-wrapper">
                <div class="card border-primary mb-2">
                    <div class="card-header bg-primary text-white">Filter</div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12 col-sm-12">
                                <div class="form-group">
                                    <label>Tanggal</label>
                                     <no-ssr>
                          
                          <v-date-picker
                            v-model="selectedDate"
                            :popover-visibility="visibility"
                            mode="range"
                            :formats="formats"
                            is-double-paned
                            show-caps
                          >
                            <b-input-group slot-scope="props" :type="inputState.type">
                              <b-input-group-text slot="append" class="pointer" title="Clear" @click="openCalendar">
                                <!--<strong class="text-danger">Clear<strong>-->
                                <i class="fa fa-calendar" title="kalender" />
                              </b-input-group-text>
                              <b-input-group-text slot="append" class="pointer" title="Clear" @click="clearDate">
                                <!--<strong class="text-danger">Clear<strong>-->
                                <i class="fa fa-trash" title="clear" />
                              </b-input-group-text>
                             
                              <b-form-input
                                type="text"
                                class="pointer"
                                :value="props.inputValue"
                                :placeholder="inputState.message"
                                readonly
                                v-on:click="openCalendar"
                                expanded
                                @change.native="props.updateValue($event.target.value)"
                              >
                                >
                              </b-form-input>
                            </b-input-group>
                          </v-date-picker>
                        </no-ssr>
                                </div>
                            </div>
                         
                        </div>
                        <div class="row d-flex justify-content-between">
                            <div class="col-3">
                                <div class="form-group">
                                  <button class="btn btn-primary" @click="exportExcel">Export Excel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <b-card>
                    <div class="row">
                        <div class="col-6">
                            <p>Penjualan Gudang Bpay</p>
                            <p>Penjualan Cibaduyut Transfer</p>
                            <p>Penjualan (Faktur)</p>
                            <p>Retur (Faktur)</p>
                            <p>Retur (Stok Manager)</p>
                        </div>
                        <div class="col-6">
                            <p>Cashback</p>
                            <p>Penjualan Gudang Transfer</p>
                            <p>Penjualan Cibaduyut Bpay</p>
                            <p>Tarik Point</p>
                            <p>Tarik Dana</p>
                        </div>
                    </div>
                </b-card>

            </div><!-- br-section-wrapper -->
        </div><!-- br-pagebody -->

</template>

<script>
   
function formatDate(date) {
  let d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}
    export default {
        name: "waitinglistvendor",
        components: {},
        data() {
            return {
                items: [],
                fields: [
                    { idx: 1, key: 'email', label: 'Email', sortable: true},
                    { idx: 2, key: 'nama', label: 'Nama', sortable: true, sortDirection: 'desc' },
                    { idx: 3, key: 'nama_brand', label: 'Brand', sortable: true },
                    { idx: 4, key: 'status', label: 'Status', sortable: true },
                    { idx: 5, key: 'actions', label: 'Actions' }
                ],
                currentPage: 1,
                perPage: 5,
                recordFiltered: 0,
                totalRows: 0,
                pageOptions: [ 5, 10, 15 ],
                sortBy: null,
                idx :0,
                sortDesc: false,
                sortDirection: 'asc',
                filter: null,
                modalInfo: { title: '', content: '' },
                status: "all",
                statusEdit: "",
                itemsDetails: [],
                fieldsDetails: [
                    { idx: 1, key: 'id', label: 'ID', sortable: true},
                    { idx: 2, key: 'nama', label: 'Nama', sortable: true, sortDirection: 'desc' },
                    { idx: 3, key: 'no_hp', label: 'No hp', sortable: true },
                    { idx: 4, key: 'email', label: 'Email', sortable: true },
                    { idx: 1, key: 'nama_brand', label: 'Nama Brand', sortable: true},
                    { idx: 2, key: 'tanggal', label: 'Tanggal', sortable: true, sortDirection: 'desc' },
                    { idx: 3, key: 'status', label: 'Status', sortable: true },
                    { idx: 4, key: 'kategori', label: 'Kategori', sortable: true },
                    { idx: 2, key: 'marketplace', label: 'Marketplace', sortable: true, sortDirection: 'desc' },
                    { idx: 3, key: 'facebook', label: 'Facebook', sortable: true },
                    { idx: 4, key: 'instagram', label: 'Instagram', sortable: true },
                    { idx: 1, key: 'website', label: 'Website', sortable: true},
                    { idx: 2, key: 'alamat', label: 'Alamat', sortable: true, sortDirection: 'desc' },
                    { idx: 3, key: 'kodepos', label: 'KodePos', sortable: true },
                    { idx: 4, key: 'kota', label: 'Kota', sortable: true },
                    { idx: 2, key: 'provinsi', label: 'Provinsi', sortable: true, sortDirection: 'desc' },
                    { idx: 5, key: 'actions', label: 'Actions' }
                ],
                selectedDate: {
                    start: null,
                    end: null,
                },
                formats: {
                    title: 'MMMM YYYY',
                    weekdays: 'W',
                    navMonths: 'MMM',
                    input: ['DD-MM-YYYY', 'DD-MM-YYYY', 'DD/MM/YYYY'],
                    dayPopover: 'DD_MM-YYY', // Only for `v-date-picker`
                    data: ['DD-MM-YYYY', 'DD-MM-YYYY', 'DD/MM/YYYY']
                },
                visibility: 'hidden'
            }
        },
        watch: {
            selectedDate(value) {
                this.visibility = 'hidden';
            }
        },
        computed: {
            sortOptions () {
                // Create an options list from our fields
                return this.fields
                    .filter(f => f.sortable)
                    .map(f => { return { text: f.label, value: f.key } })
            },
            inputState() {
                if (!this.selectedDate) {
                    return {
                        type: 'is-danger',
                        message: 'All Dates',
                    };
                }
                return {
                    type: 'is-primary',
                    message: '',
                };
            },
        },
        mounted: function(){
            let startdate = new Date();
            startdate.setMonth(startdate.getMonth() - 1);
            let endDate = new Date();

            this.selectedDate.start = startdate;
            this.selectedDate.end = endDate;

            this.getData();
        },
        methods: {
            exportExcel: function(){
                let that = this;
                let randomNumber = Math.floor(Math.random() * 6) + 5;
                let start = 0;
                let sd = "", ed = "";

                if (that.selectedDate !== null){
                    sd = formatDate(that.selectedDate.start)
                    ed = formatDate(that.selectedDate.end)
                }

                let status = this.status;
                let dataTablesS = new FormData();
               
                dataTablesS.append("start", sd);
                dataTablesS.append("end", ed);

                // Display the key/value pairs
                for(var pair of dataTablesS.entries()) {
                console.log(pair[0]+ ', '+ pair[1]); 
                }

                let data = {
                    sd: sd,
                    ed: ed
                }
//                
                let nameFile = "laporanfinancebandros"+sd.toString()+"sd"+ed.toString()+".xlsx";
                // let nameFile = "laporanfinancebandros"+Date.now()+".xlsx";
/* 
                that.$store.dispatch('exportExcel3', data).then((r)=>{
                    console.log('then ', r)
                     that.$notify.success({
                    title: 'Info',
                    message: 'File di download '
                    })
                }).catch((e)=>{
                    console.log("error d ", e)
                     that.$notify.error({
                    title: 'Info',
                    message: 'Gagal download. '+ e
                    })
                })
                */
 
                // that.$store.dispatch('exportExcel', dataTablesS).then((r) => {

                 that.$store.dispatch('exportExcelPost', dataTablesS).then((r) => {
                    const url = window.URL.createObjectURL(new Blob([r.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', nameFile); //or any other extension
                    document.body.appendChild(link);
                    link.click();

                   that.$notify.success({
                    title: 'Info',
                    message: 'File di download '
                    })

                    document.body.removeChild(link);

                }).catch((e)=>{
                  
                    that.$notify.error({
                    title: 'Info',
                    message: 'Gagal download. '+ e
                    })
                })
            },          
            statusChange: function(){
                this.getData();
            },
            sortingChanged: function(e){
                let that = this;
                function filterthis(arr, fil){
                    return arr.filter(word => word.key === fil);
                }
                if (e.sortBy){
                    let idx = filterthis(that.fields, e.sortBy);
                    that.idx = idx[0].idx;
                    if (e.sortDesc){
                        that.sortDirection = "desc";
                    } else {
                        that.sortDirection = "asc";
                    }
                }
                that.getData();
            },
            clearMe: function(){
              let that = this;
              that.filter = "";
              that.getData();
            },
            searchMe: function(){
              let that = this;
              that.getData();
            },
            pageClicked: function(){
                let that = this;
                that.getData();
            },
            toPage(e){
                let that = this;
                that.getData(e);
            },
            
            limitPage: function(e){
                this.perPage = e;
                this.getData();
            },

            clearDate: function () {
                this.selectedDate = null;
                this.visibility = this.visibility == 'hidden' ? 'visible' : 'hidden';
                this.getData();
            },
            onDatePick: function (dates) {
             
                this.getData();
            },
            openCalendar() {
                this.visibility = this.visibility == 'hidden' ? 'visible' : 'hidden';
            },
            getData: function(page){
                let that = this;
                let randomNumber = Math.floor(Math.random() * 6) + 5;
                let start;
                if (page){
                    start = (page-1)*that.perPage;
                } else {
                    start = 0;
                }

                let sd = "", ed = "";

                if (that.selectedDate !== null){
                    // sd = that.$formatDate(that.selectedDate.start);
                    // ed = that.$formatDate(that.selectedDate.end);
                }

                let status = this.status;
                let dataTablesS = new FormData();
                dataTablesS.append("draw", randomNumber);
                dataTablesS.append("order[0][column]", [that.idx]);
                dataTablesS.append("order[0][dir]", [that.sortDirection]);
                dataTablesS.append("start", start);
                dataTablesS.append("length", that.perPage);
                dataTablesS.append("search[value]", [that.filter]);
                dataTablesS.append("startDate", sd);
                dataTablesS.append("endDate", ed);
                dataTablesS.append("status", status);

                // Display the key/value pairs
               /*  for(var pair of dataTablesS.entries()) {
                console.log(pair[0]+ ', '+ pair[1]); 
                } */

                /*    
                this.$store.dispatch('getVendorWaitingList', dataTablesS).then((r) => {
                    if (r.status === 200){
                        that.items = r.data.data;
                        //that.totalRows = r.data.recordsTotal;
                        that.totalRows = r.data.recordsFiltered;
                    } else {
                        that.$toasted.error("Error "+ r.data.data, {
                            duration : 2000
                        });
                    }
                }).catch((e)=>{
                    console.log("error ", e);
                    that.$toasted.error("Token error "+ e, {
                        duration : 2000
                    });
                }) 
                */

            }
        }
    }
</script>

<style type="text/css" scoped>

.pointer:hover { 
    cursor: pointer;
}

.center {
    margin: 0 auto;
}

.mx-input-wrapper {
    bottom: 0.5em;
}

.totaldata{
    position: absolute;
    top: 1em;
    right: 2em;
}

</style>
