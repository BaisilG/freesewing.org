import React, { useState, useContext } from 'react'
import { FormattedMessage } from "react-intl";
import AppContext from "../../context/app";
import Blockquote from "@freesewing/components/Blockquote";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

const AccountPassword = props => {
  const app = useContext(AppContext);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [currentReveal, setCurrentReveal] = useState(false);
  const [newReveal, setNewReveal] = useState(false);

  const updateCurrentPassword = evt => setCurrentPassword(evt.target.value)
  const updateNewPassword = evt => setNewPassword(evt.target.value)

  return (
    <React.Fragment>
      <Blockquote type="note">
        <FormattedMessage id={"account.passwordInfo"} />
      </Blockquote>
            <TextField
              id="currentPassword"
              fullWidth={true}
              label={app.frontend.intl.formatMessage({ id: "account.currentPassword"})}
              margin="normal"
              variant="outlined"
              value={currentPassword}
              type={ currentReveal ? "text" : "password"}
              onChange={updateCurrentPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <span role="img" aria-label="reveal" onClick={() => setCurrentReveal(!currentReveal)} className="poh">
                      {currentReveal
                        ? <span role="img" aria-label="show">👀 </span>
                        : <span role="img" aria-label="show">🙈 </span>
                      }
                    </span>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              id="newPassword"
              fullWidth={true}
              label={app.frontend.intl.formatMessage({ id: "account.newPassword" })}
              margin="normal"
              variant="outlined"
              value={newPassword}
              type={ newReveal ? "text" : "password"}
              onChange={updateNewPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <span role="img" aria-label="reveal" onClick={() => setNewReveal(!newReveal)} className="poh">
                      {newReveal
                        ? <span role="img" aria-label="show">👀 </span>
                        : <span role="img" aria-label="show">🙈 </span>
                      }
                    </span>
                  </InputAdornment>
                )
              }}
            />
      <p style={{textAlign: "right"}}>
        <Button
          size="large"
          variant="outlined"
          color="primary"
          href="/account/settings"
        >
          <FormattedMessage id="app.cancel" />
        </Button>
        <Button
          size="large"
          style={{marginLeft: '1rem'}}
          variant="contained"
          color="primary"
          onClick={() => app.backend.saveAccount(
            { currentPassword, newPassword },
            app.frontend.intl.formatMessage({id: "account.password"})
          )}
        >
          <FormattedMessage id="app.save" />
        </Button>
      </p>
    </React.Fragment>
  );
};

export default AccountPassword;
