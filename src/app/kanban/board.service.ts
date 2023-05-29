import { Injectable, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, authState } from '@angular/fire/auth';
import {
  Firestore,
  addDoc,
  arrayRemove,
  collection,
  collectionData,
  deleteDoc,
  doc,
  orderBy,
  query,
  updateDoc,
  where,
  writeBatch,
} from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { Board, Task } from './board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private readonly _auth = inject(Auth);
  private readonly _firestore = inject(Firestore);

  /**
   * Creates a new board for the current user
   */
  async createBoard(data: Board) {
    const user = this._auth.currentUser;
    if (!user) return;

    return await addDoc(collection(this._firestore, 'boards'), {
      ...data,
      uid: user.uid,
      tasks: [{ description: 'Hello!', label: 'yellow' }],
    });
  }

  async updateBoard(data: Board) {
    const user = this._auth.currentUser;
    if (!user) return;
    if (!data.id) return;

    return await updateDoc(doc(this._firestore, 'boards', data.id), {
      ...data,
    });
  }

  /**
   * Delete board
   */
  async deleteBoard(boardId: string) {
    return await deleteDoc(doc(this._firestore, 'boards', boardId));
  }

  /**
   * Updates the tasks on board
   */
  async updateTasks(boardId: string, tasks: Task[]) {
    return await updateDoc(doc(this._firestore, 'boards', boardId), { tasks });
  }

  /**
   * Remove a specifc task from the board
   */
  removeTask(boardId: string, task: Task) {
    updateDoc(doc(this._firestore, 'boards', boardId), {
      tasks: arrayRemove(task),
    });
  }

  /**
   * Get all boards owned by current user
   */
  getUserBoards(): Signal<Board[]> {
    return toSignal(
      authState(this._auth).pipe(
        switchMap((user) => {
          if (user) {
            return collectionData<Board>(
              query(
                collection(this._firestore, 'boards'),
                where('uid', '==', user.uid),
                orderBy('priority')
              ),
              { idField: 'id' }
            );
          }
          return [];
        })
      ),
      { initialValue: [] }
    );
  }

  /**
   * Run a batch write to change the priority of each board for sorting
   */
  async sortBoards(boards: Board[]) {
    const batch = writeBatch(this._firestore);
    const refs = boards.map((b) => doc(this._firestore, 'boards', b.id!)); // TODO: best way to get rid of ! here?
    refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
    await batch.commit();
  }
}
