import app, { Observer } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID
};

export default class Firebase {
  auth: firebase.auth.Auth;
  database: firebase.firestore.Firestore;
  storage: firebase.storage.Storage;

  constructor() {
    app.initializeApp(config);
    this.database = app.firestore();
    this.auth = app.auth();
    this.storage = app.storage();
  }

  getFileRef(fileName: string, folder: string): firebase.storage.Reference {
    try {
      const fileRef = this.storage.ref().child(`${folder}/${fileName}`);
      return fileRef;
    } catch (err) {
      throw new Error(err);
    }
  }

  async subirImagen(file: File, folder: string): Promise<void> {
    const fileRef = this.getFileRef(file.name, folder);
    try {
      await fileRef.put(file);
    } catch (err) {
      throw new Error(`${file.name} could not be retrieved`);
    }
  }

  async borrarImagen(file: string, folder: string): Promise<void> {
    try {
      const fileRef = this.getFileRef(file, folder);
      await fileRef.delete();
    } catch (err) {
      throw new Error(err);
    }
  }

  async getFile(file: string, folder: string): Promise<string> {
    try {
      const fileRef = this.getFileRef(file, folder);
      return await fileRef.getDownloadURL();
    } catch (err) {
      throw new Error(err);
    }
  }

  /********
   * Auth *
   ********/

  async signInWithGoogle() {
    try {
      const gauthprovider = new app.auth.GoogleAuthProvider();
      gauthprovider.addScope(
        'https://www.googleapis.com/auth/contacts.readonly'
      );
      const res = await this.auth.signInWithPopup(gauthprovider);
      //const token = res.credential.accessToken || null;
      // The signed-in user info.
      //const user = res.user;
    } catch (err) {
      throw new Error(err);
    }
  }

  async createUserEmail(email: string, password: string): Promise<void> {
    try {
      await this.auth.createUserWithEmailAndPassword(email, password);
    } catch (err) {
      throw new Error(err);
    }
  }

  async signInEmail(email: string, password: string): Promise<void> {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      throw new Error(err);
    }
  }

  signOut() {
    this.auth.signOut();
  }

  resetPassword(email: string): void {
    this.auth.sendPasswordResetEmail(email);
  }

  /**
   * Expose method to handle user login somewhere else
   */
  onAuthStateChanged(
    callback: Observer<firebase.User | null>
  ): firebase.Unsubscribe {
    return this.auth.onAuthStateChanged(callback);
  }

  /************
   * DATABASE *
   ************/
  async insert(collection: string, data: object): Promise<string> {
    try {
      const docRef = await this.database.collection(collection).add(data);
      return docRef.id;
    } catch (err) {
      throw new Error(`Error inserting on ${collection} - ${err}`);
    }
  }

  async update(collection: string, id: string, data: object): Promise<void> {
    try {
      await this.database
        .collection(collection)
        .doc(id)
        .update(data);
    } catch (err) {
      throw new Error(`Error updating on ${collection} - ${err}`);
    }
  }

  collection(collection: string): firebase.firestore.CollectionReference {
    return this.database.collection(collection);
  }
  async getAll(collection: string): Promise<firebase.firestore.QuerySnapshot> {
    try {
      const querySnapshot = await this.database.collection(collection).get();
      return querySnapshot;
    } catch (err) {
      throw new Error(`Error getting on ${collection} - ${err}`);
    }
  }
}
