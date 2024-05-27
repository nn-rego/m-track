import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexdbService{

  request : IDBOpenDBRequest;
  db: IDBFactory;
  dbUpgrade : IDBDatabase;
  dbSuccess : IDBDatabase;
  objectStore : IDBObjectStore;
  transaction: IDBTransaction;
  store: IDBObjectStore;

  monthIndex: IDBIndex;


  constructor() {
    console.log('Constr Service:::')
   }

  async initIndexDb(): Promise<void> {
    this.db = window.indexedDB;
    this.request = this.db.open('MY_INDEX_DB', 4);

    this.request.addEventListener('error', () => {
      console.log("Error opening Indexed DB");
    })

    this.request.addEventListener('success', () => {
      console.log('Opened Indexed DB');
    })

    this.request.addEventListener('upgradeneeded', () => {
      console.log('Creating Object STore')
      this.dbUpgrade = this.request.result;
      
      this.objectStore = this.dbUpgrade.createObjectStore(
        'months', 
        { keyPath: 'id', autoIncrement: true })
      
      this.objectStore.createIndex('month_index', 'month_name', {unique: false})

    })

    this.request.addEventListener('success', async()=> {
      console.log('Success');
      this.dbSuccess = this.request.result;
      this.transaction = this.dbSuccess.transaction('months', 'readwrite');
      
      this.store = this.transaction.objectStore('months');

      this.monthIndex = this.store.index('month_index');
      console.log(this.monthIndex)
  
      this.store.put({
        month_name: 'April',
        date: 90
      })
      this.store.put({
        month_name: 'May'
      })

      this.store.put({
        month_name: 'June'
      })

      this.transaction.addEventListener('complete', ()=> {
        console.log('Success added put items');
      });

      this.transaction.addEventListener('error', (err)=> {
        console.log('Something went wrongg', err)
      })

    })  
  }

  findDataByMonth(m : any) {
    const tran = this.dbSuccess.transaction('months', 'readwrite');
    const st = tran.objectStore('months');

    const idx = st.index('month_index');
    // const res = idx.get('May');
    // res.addEventListener('success', () => {
    //     console.log(res.result);
    // })
    // const request = index.openCursor(IDBKeyRange.only(name));

    // request.onsuccess = (event) => {
    //   const cursor = event.target.result;
    //   if (cursor) {
    //     cursor.delete();
    //     cursor.continue();
    //   }
    // };

    const res = idx.openCursor(IDBKeyRange.only('May'));

    res.onsuccess = (event) => {
      const cur = (res.result);
      console.log('Found: ', cur);

      // if(cur) {
      //   cur.delete();
      // }
      if(cur) {
        const updatedRecord = { ...cur.value, month_name: 'May', ph:90005 };
        cur.update(updatedRecord)
      }
    }

  }


}
