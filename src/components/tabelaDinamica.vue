<template>
  <div>
     <table>
            <thead>
                <tr>

                    <th scope="col">#</th>
                    <th scope="col">Numero do Produto</th>
                    <th scope="col">Nome do Produto</th>
                    <th scope="col text-rigth">Preço</th>
                    <th scope="col  text-rigth">Quantidade</th>
                    <th scope="col  text-rigth">Total</th>
                </tr>
            </thead>
            <tr v-for="(invoice_product, k) in invoice_products" :key="k">

                <td scope="row" class="trashIconContainer">
                    <!-- <i class="far fa-trash-alt" @click="deleteRow(k, invoice_product)"></i> -->
                    <button v-if="k>0" type='button' class="btn btn-info" @click="deleteRow(k, invoice_product)">
                        <i class="fas fa-plus-circle"></i>
                     delete
                    </button>
                </td>

                <td>
                    <input class="form-control" type="text" v-model="invoice_product.product_no" />
                </td>
                <td>
                    <input class="form-control" type="text" v-model="invoice_product.product_name" />
                </td>
                <td>
                    <input class="form-control text-right" type="number" min="0" step=".01" v-model="invoice_product.product_price" @change="calculateLineTotal(invoice_product)" />
                </td>
                <td>
                    <input class="form-control text-right" type="number" min="0" step=".01" v-model="invoice_product.product_qty" @change="calculateLineTotal(invoice_product);saveInvoice()" />
                </td>
                <td>
                    <input readonly class="form-control text-right" type="number" min="0" step=".01" v-model="invoice_product.line_total" />
                </td>
            </tr>
        </table>
        <button type='button' class="btn btn-info" @click="addNewRow">
            <i class="fas fa-plus-circle"></i>
            Add
        </button>
        <tfoot>
            <tr>
                <td colspan="5" class="text-rigth">Subtotal</td>
                <td class="text-rigth">{{invoice_subtotal}}</td>
            </tr>
            <tr>
                <td colspan="5" class="text-rigth">Tax</td>
                <td class="text-rigth">{{invoice_tax}}</td>
            </tr>
            <tr>
                <td colspan="5" class="text-rigth">total</td>
                <td class="text-rigth">{{invoice_total}}</td>
            </tr>
        </tfoot>
        <br>
        <br>
      
  </div>
</template>
<script>
import { Select, Option, Table, TableColumn } from 'element-ui';

export default {
    components:{
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn

    },
     data(){
         return{
                invoice_subtotal: 0,
                invoice_total: 0,
                invoice_tax: 5,
                invoice_products: [{
                    product_no: '',
                    product_name: '',
                    product_price: '',
                    product_qty: '',
                    line_total: 0
                }]
           }
            },
            methods: {
                saveInvoice() {
                    console.log(JSON.stringify(this.invoice_product));
                },
                addNewRow() {

                    this.invoice_products.push({
                        product_no: '',
                        product_name: '',
                        product_price: '',
                        product_qty: '',
                        line_total: 0
                    });
                },

                deleteRow(index, invoice_product) {
                    var idx = this.invoice_products.indexOf(invoice_product);
                    console.log(idx, index);
                    if (idx > -1) {
                        this.invoice_products.splice(idx, 1);
                    }
                    this.calculateTotal();
                },
                calculateLineTotal(invoice_product) {
                    var total = parseFloat(invoice_product.product_price) * parseFloat(invoice_product.product_qty);
                    if (!isNaN(total)) {
                        invoice_product.line_total = total.toFixed(2);
                    }
                    this.calculateTotal();
                },
                calculateTotal() {
                    var subtotal, total;
                    subtotal = this.invoice_products.reduce(function(sum, product) {
                        var lineTotal = parseFloat(product.line_total);
                        if (!isNaN(lineTotal)) {
                            return sum + lineTotal;
                        }
                    }, 0);

                    this.invoice_subtotal = subtotal.toFixed(2);

                    total = (subtotal * (this.invoice_tax / 100)) + subtotal;
                    total = parseFloat(total);
                    if (!isNaN(total)) {
                        this.invoice_total = total.toFixed(2);
                    } else {
                        this.invoice_total = '0.00'
                    }
                },
            },
            created() {
               
            },
    
}
</script>>