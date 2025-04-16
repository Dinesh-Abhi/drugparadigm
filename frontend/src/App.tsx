import { BrowserRouter } from 'react-router-dom';
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import { ComponentWrapper, SuperTokensConfig } from './config';
import AppRoutes from './routes/AppRoutes';
import { Provider } from 'react-redux';
import { store } from './redux/store';

// Initialize SuperTokens with the config
SuperTokens.init(SuperTokensConfig);

function App() {
  return (
    <SuperTokensWrapper>
      <Provider store={store}> 
        <ComponentWrapper>
          <div className="App app-container">
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </div>
        </ComponentWrapper>
      </Provider>
    </SuperTokensWrapper>
  );
}

export default App;
