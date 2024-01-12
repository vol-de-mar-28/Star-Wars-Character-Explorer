import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import charactersReducer from './slices/charactersSlice';
import characterReducer from './slices/characterSlice';
import preloaderReducer from './slices/preloaderSlice';
// ----------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const rootReducer = combineReducers({
  characters: charactersReducer,
  character: characterReducer,
  preloader: preloaderReducer
});

export { rootPersistConfig, rootReducer };
