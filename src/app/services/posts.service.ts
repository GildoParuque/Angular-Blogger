import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import * as firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private afs: AngularFirestore) { }

  loadFeatured(){

    return this.afs.collection('post',ref => ref.where('isFeatured', '==', true).limit(4)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {

          const data  = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data};
        })
      })
    )

  }


  loadLatest(){
    return this.afs.collection('post',ref => ref.orderBy('createdAt')).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {

          const data  = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data};
        })
      })
    )
  }

  loadCategoryPosts( categoryId ){

    return this.afs.collection('post',ref => ref.where('category.categoryId', '==', categoryId)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {

          const data  = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data};
        })
      })
    )
  }

  loadOnePost(postId){

    return  this.afs.doc(`post/${postId}`).valueChanges();

  }

  loadSimilar(categoryId){

    return this.afs.collection('post',ref => ref.where('category.categoryId', '==', categoryId).limit(4)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {

          const data  = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data};
        })
      })
    )

  }

  countview( postId ){

    const viewsCount = {

      views: firebase.default.firestore.FieldValue.increment(1)

    }

    this.afs.doc(`post/${postId}`).update(viewsCount).then(() =>{
      console.log('View Count Updated')
    })

  }
}
