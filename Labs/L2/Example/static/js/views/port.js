'use strict'

const portModel = new Port() // eslint-disable-line no-undef

function initAddForm () {
  const form = window.document.querySelector('#port-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const portData = {}
    formData.forEach((value, key) => {
      portData[key] = value
    })

    portModel.Create(portData)

    e.target.reset()
  })
}

function initList () {
  window.jQuery('#port-list').DataTable({
    data: portModel.Select(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Name', data: 'name' },
      { title: 'Country', data: 'country' },
      { title: 'Number', data: 'number' },
      { title: 'Address', data: 'address' },
      { title: 'Delete', data: '' }
    ],
    columnDefs: [
      {
        "render": function(data, type, row) {
          return '<button type="button" value="delete" onclick="deleteItem(this)">Delete</button>';
        },
        "targets": 5
      }
    ]
  })
}

function initListEvents () {
  document.addEventListener('portsListDataChanged', function (e) {
    const dataTable = window.jQuery('#port-list').DataTable()

    dataTable.clear()
    dataTable.rows.add(e.detail)
    dataTable.draw()
  }, false)
}

function deleteItem(e) {
  let row = e.parentNode.parentNode;
  let id = row.getElementsByTagName('td')[0].innerText;
  row.remove();
  portModel.Delete(id);
}

window.addEventListener('DOMContentLoaded', e => {
  initAddForm()
  initList()
  initListEvents()
})
