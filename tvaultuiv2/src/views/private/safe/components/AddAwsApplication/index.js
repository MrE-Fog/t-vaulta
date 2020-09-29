import React, { useState } from 'react';
import styled from 'styled-components';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Typography, InputLabel } from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import PropTypes from 'prop-types';
import TextFieldComponent from '../../../../../components/FormFields/TextField';
import RadioPermissionComponent from '../RadioPermissions';
import ButtonComponent from '../../../../../components/FormFields/ActionButton';
import mediaBreakpoints from '../../../../../breakpoints';

const { small } = mediaBreakpoints;
const ContainerWrapper = styled.section``;

const InputAwsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem 0;
`;

const EachInputField = styled.div`
  width: 48%;
`;

const CancelSaveWrapper = styled.div`
  display: flex;
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

const CancelButton = styled.div`
  margin-right: 0.8rem;
  ${small} {
    margin-right: 1rem;
    width: 100%;
  }
`;

const RadioWrapper = styled.div``;

const AddAwsApplication = (props) => {
  const { handleSaveClick, handleCancelClick } = props;
  const [awsAuthenticationType, setAwsAuthenticationType] = useState('ec2');
  const [roleName, setRoleName] = useState('');
  const [iamRoleArn, setIamRoleArn] = useState('');
  const [vpcId, setVpcId] = useState('');
  const [accountId, setAccountId] = useState('');
  const [subnetId, setSubnetId] = useState('');
  const [amiId, setAmiId] = useState('');
  const [profileArn, setProfileArn] = useState('');
  const [region, setRegion] = useState('');
  const [iamPrincipalArn, setIamPrincipalArn] = useState('');
  const [radioValue, setRadioValue] = useState('read');
  const [isEC2, setIsEC2] = useState(true);
  const isMobileScreen = useMediaQuery(small);

  const handleAwsRadioChange = (event) => {
    setAwsAuthenticationType(event.target.value);
    if (event.target.value === 'ec2') {
      setIsEC2(true);
    } else {
      setIsEC2(false);
    }
  };

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  const onCreateClicked = () => {
    let data = {};
    if (isEC2) {
      data = {
        auth_type: awsAuthenticationType,
        bound_ami_id: amiId,
        bound_iam_instance_profile_arn: profileArn,
        bound_iam_principal_arn: '',
        bound_iam_role_arn: iamRoleArn,
        bound_region: region,
        bound_subnet_id: subnetId,
        bound_vpc_id: vpcId,
        policies: '',
        resolve_aws_unique_ids: 'false',
        role: roleName,
      };
    } else {
      data = {
        auth_type: awsAuthenticationType,
        bound_ami_id: '',
        bound_iam_instance_profile_arn: '',
        bound_iam_principal_arn: iamPrincipalArn,
        bound_iam_role_arn: '',
        bound_region: '',
        bound_subnet_id: '',
        bound_vpc_id: '',
        policies: '',
        resolve_aws_unique_ids: 'false',
        role: roleName,
      };
    }
    handleSaveClick(data, radioValue);
  };
  return (
    <ContainerWrapper>
      <Typography variant="h5">Create AWS Configuration</Typography>
      <InputLabel required>AWS Authentication Type</InputLabel>
      <RadioGroup
        row
        aria-label="awsauthentication"
        name="awsauthentication"
        value={awsAuthenticationType}
        onChange={handleAwsRadioChange}
      >
        <FormControlLabel
          value="ec2"
          control={<Radio color="default" />}
          label="EC2"
        />
        <FormControlLabel
          value="iam"
          control={<Radio color="default" />}
          label="IAM"
        />
      </RadioGroup>
      <InputLabel required>Role Name</InputLabel>
      <TextFieldComponent
        value={roleName}
        placeholder="Role name- Enter min 3 charactes"
        fullWidth
        name="roleName"
        onChange={(e) => setRoleName(e.target.value)}
      />
      <InputAwsWrapper>
        <EachInputField>
          <InputLabel required>Account ID</InputLabel>
          <TextFieldComponent
            value={accountId}
            placeholder="Account ID"
            fullWidth
            readOnly={!isEC2}
            name="accountId"
            onChange={(e) => setAccountId(e.target.value)}
          />
        </EachInputField>
        <EachInputField>
          <InputLabel required>Region</InputLabel>
          <TextFieldComponent
            value={region}
            placeholder="Region"
            fullWidth
            readOnly={!isEC2}
            name="region"
            onChange={(e) => setRegion(e.target.value)}
          />
        </EachInputField>
      </InputAwsWrapper>
      <InputAwsWrapper>
        <EachInputField>
          <InputLabel required>VPC ID</InputLabel>
          <TextFieldComponent
            value={vpcId}
            placeholder="VPC ID"
            fullWidth
            readOnly={!isEC2}
            name="vpcId"
            onChange={(e) => setVpcId(e.target.value)}
          />
        </EachInputField>
        <EachInputField>
          <InputLabel required>Subnet ID</InputLabel>
          <TextFieldComponent
            value={subnetId}
            placeholder="Subnet ID"
            fullWidth
            readOnly={!isEC2}
            name="subnetId"
            onChange={(e) => setSubnetId(e.target.value)}
          />
        </EachInputField>
      </InputAwsWrapper>
      <InputAwsWrapper>
        <EachInputField>
          <InputLabel required>AMI ID</InputLabel>
          <TextFieldComponent
            value={amiId}
            placeholder="AMI ID"
            fullWidth
            readOnly={!isEC2}
            name="amiId"
            onChange={(e) => setAmiId(e.target.value)}
          />
        </EachInputField>
        <EachInputField>
          <InputLabel required>Instance Profile ARN</InputLabel>
          <TextFieldComponent
            value={profileArn}
            placeholder="Instance Profile ARN"
            fullWidth
            readOnly={!isEC2}
            name="profileArn"
            onChange={(e) => setProfileArn(e.target.value)}
          />
        </EachInputField>
      </InputAwsWrapper>
      <InputAwsWrapper>
        <EachInputField>
          <InputLabel required>IAM Role ARN</InputLabel>
          <TextFieldComponent
            value={iamRoleArn}
            placeholder="IAM Role ARN"
            fullWidth
            readOnly={!isEC2}
            name="iamRoleArn"
            onChange={(e) => setIamRoleArn(e.target.value)}
          />
        </EachInputField>
        <EachInputField>
          <InputLabel required>IAM Principal ARN</InputLabel>
          <TextFieldComponent
            value={iamPrincipalArn}
            placeholder="IAM Principal ARN"
            fullWidth
            readOnly={isEC2}
            name="iamPrincipalArn"
            onChange={(e) => setIamPrincipalArn(e.target.value)}
          />
        </EachInputField>
      </InputAwsWrapper>
      <RadioWrapper>
        <InputLabel required>Permission</InputLabel>
        <RadioPermissionComponent
          radioValue={radioValue}
          handleRadioChange={(e) => handleRadioChange(e)}
        />
      </RadioWrapper>
      <CancelSaveWrapper>
        <CancelButton>
          <ButtonComponent
            label="Cancel"
            color="primary"
            onClick={() => handleCancelClick()}
            width={isMobileScreen ? '100%' : ''}
          />
        </CancelButton>
        <ButtonComponent
          label="Create"
          color="secondary"
          icon="add"
          onClick={() => onCreateClicked()}
          width={isMobileScreen ? '100%' : ''}
        />
      </CancelSaveWrapper>
    </ContainerWrapper>
  );
};
AddAwsApplication.propTypes = {
  handleCancelClick: PropTypes.func.isRequired,
  handleSaveClick: PropTypes.func.isRequired,
};
export default AddAwsApplication;
