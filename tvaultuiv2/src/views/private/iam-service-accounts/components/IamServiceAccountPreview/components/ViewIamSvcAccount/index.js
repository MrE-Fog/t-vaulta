import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Typography } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import ButtonComponent from '../../../../../../../components/FormFields/ActionButton';
import svcHeaderBgimg from '../../../../../../../assets/icon-service-account.svg';
import mediaBreakpoints from '../../../../../../../breakpoints';
import leftArrowIcon from '../../../../../../../assets/left-arrow.svg';
import ComponentError from '../../../../../../../errorBoundaries/ComponentError/component-error';
import CollapsibleDropdown from '../../../../../../../components/CollapsibleDropdown';

const { small, belowLarge } = mediaBreakpoints;

const ModalWrapper = styled.section`
  background-color: ${(props) => props.theme.palette.background.modal};
  padding: 5.5rem 6rem 6rem 6rem;
  border: none;
  outline: none;
  width: 69.6rem;
  margin: auto 0;
  display: flex;
  flex-direction: column;
  position: relative;
  ${belowLarge} {
    padding: 2.7rem 5rem 3.2rem 5rem;
    width: 57.2rem;
  }
  ${small} {
    width: 100%;
    padding: 2rem;
    margin: 0;
    height: fit-content;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  ${small} {
    margin-top: 1rem;
  }
`;

const LeftIcon = styled.img`
  display: none;
  ${small} {
    display: block;
    margin-right: 1.4rem;
    margin-top: 0.3rem;
  }
`;

const PreviewWrap = styled.div``;

const CancelSaveWrapper = styled.div`
  display: ${(props) => (props.showPreview ? 'none' : 'flex')};
  justify-content: flex-end;
  ${small} {
    margin-top: 5.3rem;
  }
  button {
    ${small} {
      height: 4.5rem;
    }
  }
`;

const Label = styled.p`
  font-size: 1.3rem;
  color: ${(props) => props.theme.customColor.label.color};
  margin-bottom: 0.9rem;
  cursor: ${(props) => props.cursor};
`;

const Value = styled.p`
  font-size: 1.8rem;
  word-break: break-all;
`;

const EachDetail = styled.div`
  margin-bottom: 3rem;
  p {
    margin: 0;
  }
`;

const SvcIcon = styled.img`
  height: 5.7rem;
  width: 5rem;
  margin-right: 2rem;
`;

const ViewMoreStyles = css`
  display: flex;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
  margin-left: 6.1rem;
`;

const HeaderInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const InfoLine = styled('p')`
  color: ${(props) => props.theme.customColor.collapse.color};
  fontsize: ${(props) => props.theme.typography.body2.fontSize};
`;

const InfoContainer = styled.div`
  padding: 1rem 0;
`;
const Span = styled('span')`
  color: ${(props) => props.theme.customColor.collapse.title};
  fontsize: ${(props) => props.theme.typography.body2.fontSize};
  ${(props) => props.extraStyles}
`;
const CollapsibleContainer = styled('div')``;

const useTooltipStyles = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.white,
  },
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontSize: theme.typography.subtitle2.fontSize,
    textAlign: 'center',
  },
}));

const ViewIamSvcAccountDetails = (props) => {
  const { iamSvcAccountData, isMobileScreen, handleCloseModal } = props;
  const tooltipClasses = useTooltipStyles();

  const onCancelViewDetails = () => {
    handleCloseModal();
  };

  return (
    <ComponentError>
      <ModalWrapper>
        <HeaderWrapper>
          <LeftIcon
            src={leftArrowIcon}
            alt="go-back"
            onClick={() => onCancelViewDetails(false)}
          />
          <Typography variant="h5">View IAM Service Account</Typography>
        </HeaderWrapper>
        <PreviewWrap>
          <InfoContainer>
            <HeaderInfoWrapper>
              <SvcIcon alt="safe-icon" src={svcHeaderBgimg} />
              <InfoLine>
                T-Vault can be used to manage to read and rotate the secrets of
                IAM service accounts. In order to self-service your IAM service
                accounts there is a three-step process to onboard the account
                into T-Vault.
              </InfoLine>
            </HeaderInfoWrapper>
            <CollapsibleDropdown
              titleMore="View More"
              titleLess="View Less"
              collapseStyles="background:none"
              titleCss={ViewMoreStyles}
            >
              <CollapsibleContainer>
                <InfoLine>
                  <Span>
                    <strong>Step 1: On-Boarding: </strong>
                  </Span>
                  This step brings the IAM service account into T-Vault so that
                  the secrets can be read or rotated through T-Vault. This is a
                  one-time operation.
                </InfoLine>

                <InfoLine>
                  <Span>
                    <strong>Step 2: Service Account AccessKey Creation: </strong>
                  </Span>
                  The IAM service account owner and users/groups with write
                  permission can create AccessKeys once after on-boarding
                  account into T-Vault. Maximum of 2 Access keys can be created
                  for an IAM Service Account.
                </InfoLine>
                <InfoLine>
                  <Span>
                    <strong>Step 3: Granting Permissions: </strong>
                  </Span>
                  The account owner can grant specific permissions to other users
                  and groups allowing others to read and/or rotate the secrets
                  for the IAM service account as well through T-Vault.
                </InfoLine>
              </CollapsibleContainer>
            </CollapsibleDropdown>
          </InfoContainer>
          <EachDetail>
            <Tooltip
              classes={tooltipClasses}
              arrow
              title="IAM Service Account Name"
              placement="top"
            >
              <Label cursor="pointer">IAM Service Account Name</Label>
            </Tooltip>
            <Value>{iamSvcAccountData?.userName}</Value>
          </EachDetail>
          <EachDetail>
            <Tooltip
              classes={tooltipClasses}
              arrow
              title="Owner of IAM Service Account"
              placement="top"
            >
              <Label cursor="pointer">Owner (Managed By)</Label>
            </Tooltip>
            <Value>{iamSvcAccountData?.owner_ntid}</Value>
          </EachDetail>
          <EachDetail>
            <Tooltip
              classes={tooltipClasses}
              arrow
              title="Owner email for IAM Service Account"
              placement="top"
            >
              <Label cursor="pointer">Owner Email</Label>
            </Tooltip>
            <Value>{iamSvcAccountData?.owner_email}</Value>
          </EachDetail>
          <EachDetail>
            <Tooltip
              classes={tooltipClasses}
              arrow
              title="AWS Account ID"
              placement="top"
            >
              <Label cursor="pointer">AWS Account ID</Label>
            </Tooltip>
            <Value>{iamSvcAccountData?.awsAccountId}</Value>
          </EachDetail>
          <EachDetail>
            <Tooltip
              classes={tooltipClasses}
              arrow
              title="AWS Account Name"
              placement="top"
            >
              <Label cursor="pointer">AWS Account Name</Label>
            </Tooltip>
            <Value>{iamSvcAccountData?.awsAccountName}</Value>
          </EachDetail>
          <EachDetail>
            <Tooltip
              classes={tooltipClasses}
              arrow
              title="Account created date"
              placement="top"
            >
              <Label cursor="pointer">Created On</Label>
            </Tooltip>
            <Value>{iamSvcAccountData?.createdDate}</Value>
          </EachDetail>
          <EachDetail>
            <Tooltip
              classes={tooltipClasses}
              arrow
              title="Application Name"
              placement="top"
            >
              <Label cursor="pointer">Application Name</Label>
            </Tooltip>
            <Value>{iamSvcAccountData?.application_name}</Value>
          </EachDetail>
        </PreviewWrap>
        <CancelSaveWrapper>
          <ButtonComponent
            label="Cancel"
            color="primary"
            onClick={() => onCancelViewDetails(false)}
            width={isMobileScreen ? '100%' : ''}
          />
        </CancelSaveWrapper>
      </ModalWrapper>
    </ComponentError>
  );
};

ViewIamSvcAccountDetails.propTypes = {
  iamSvcAccountData: PropTypes.objectOf(PropTypes.any),
  isMobileScreen: PropTypes.bool,
  handleCloseModal: PropTypes.func,
};

ViewIamSvcAccountDetails.defaultProps = {
  iamSvcAccountData: {},
  isMobileScreen: false,
  handleCloseModal: () => {},
};

export default ViewIamSvcAccountDetails;
