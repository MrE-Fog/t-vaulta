// =========================================================================
// Copyright 2019 T-Mobile, US
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// See the readme.txt file for additional language around disclaimer of warranties.
// =========================================================================
package com.tmobile.cso.vault.api.v2.controller;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tmobile.cso.vault.api.main.Application;
import com.tmobile.cso.vault.api.model.AWSIAMRole;
import com.tmobile.cso.vault.api.service.AWSIAMAuthService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = Application.class)
@ComponentScan(basePackages={"com.tmobile.cso.vault.api"})
@WebAppConfiguration
public class AWSIAMAuthControllerV2Test {

    private MockMvc mockMvc;

    @Mock
    private AWSIAMAuthService awsiamAuthService;

    @InjectMocks
    private AWSIAMAuthControllerV2 awsiamAuthControllerV2;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        this.mockMvc = MockMvcBuilders.standaloneSetup(awsiamAuthControllerV2).build();
    }

    @Test
    public void test_createIAMRole() throws Exception {
        AWSIAMRole awsiamRole = new AWSIAMRole();
        awsiamRole.setAuth_type("iam");
        String[] arns = {"arn:aws:iam::123456789012:user/tst"};
        awsiamRole.setBound_iam_principal_arn(arns);
        String[] policies = {"default"};
        awsiamRole.setPolicies(policies);
        awsiamRole.setResolve_aws_unique_ids(true);
        awsiamRole.setRole("string");

        String inputJson =new ObjectMapper().writeValueAsString(awsiamRole);
        String responseMessage = "{\"messages\":[\"AWS IAM Role created successfully \"]}";
        ResponseEntity<String> responseEntityExpected = ResponseEntity.status(HttpStatus.OK).body(responseMessage);

        when(awsiamAuthService.createIAMRole(Mockito.any(), Mockito.eq("5PDrOhsy4ig8L3EpsJZSLAMg"), Mockito.any())).thenReturn(responseEntityExpected);

        mockMvc.perform(MockMvcRequestBuilders.post("/v2/auth/aws/iam/role")
                .header("vault-token", "5PDrOhsy4ig8L3EpsJZSLAMg")
                .header("Content-Type", "application/json;charset=UTF-8")
                .content(inputJson))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString(responseMessage)));
    }

    @Test
    public void test_updateIAMRole() throws Exception {
        AWSIAMRole awsiamRole = new AWSIAMRole();
        awsiamRole.setAuth_type("iam");
        String[] arns = {"arn:aws:iam::123456789012:user/tst"};
        awsiamRole.setBound_iam_principal_arn(arns);
        String[] policies = {"default"};
        awsiamRole.setPolicies(policies);
        awsiamRole.setResolve_aws_unique_ids(true);
        awsiamRole.setRole("string");

        String inputJson =new ObjectMapper().writeValueAsString(awsiamRole);
        String responseMessage = "{\"messages\":[\"AWS IAM Role created successfully \"]}";
        ResponseEntity<String> responseEntityExpected = ResponseEntity.status(HttpStatus.OK).body(responseMessage);

        when(awsiamAuthService.updateIAMRole(Mockito.eq("5PDrOhsy4ig8L3EpsJZSLAMg"), Mockito.any())).thenReturn(responseEntityExpected);

        mockMvc.perform(MockMvcRequestBuilders.put("/v2/auth/aws/iam/role")
                .header("vault-token", "5PDrOhsy4ig8L3EpsJZSLAMg")
                .header("Content-Type", "application/json;charset=UTF-8")
                .content(inputJson))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString(responseMessage)));
    }

    @Test
    public void test_fetchIAMRole() throws Exception {

        String responseMessage = "{\"bound_ami_id\": [\"ami-fce3c696\"],\"role_tag\": \"\",\"policies\": " +
                "[\"\\\"[prod\", \"dev\\\"]\" ],\"bound_iam_principal_arn\": [],\"bound_iam_role_arn\":" +
                "[ \"arn:aws:iam::8987887:role/test-role\"],\"max_ttl\": 0,\"disallow_reauthentication\": " +
                "false,\"allow_instance_migration\": false}";
        ResponseEntity<String> responseEntityExpected = ResponseEntity.status(HttpStatus.OK).body(responseMessage);

        when(awsiamAuthService.fetchIAMRole(Mockito.eq("5PDrOhsy4ig8L3EpsJZSLAMg"), Mockito.any())).thenReturn(responseEntityExpected);

        mockMvc.perform(MockMvcRequestBuilders.get("/v2/auth/aws/iam/role/role1")
                .header("vault-token", "5PDrOhsy4ig8L3EpsJZSLAMg")
                .header("Content-Type", "application/json;charset=UTF-8"))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString(responseMessage)));
    }

    @Test
    public void test_listIAMRoles() throws Exception {

        String responseMessage = "{  \"keys\": [ \"mytestawsrole\" ]}";
        ResponseEntity<String> responseEntityExpected = ResponseEntity.status(HttpStatus.OK).body(responseMessage);

        when(awsiamAuthService.listIAMRoles(Mockito.eq("5PDrOhsy4ig8L3EpsJZSLAMg"))).thenReturn(responseEntityExpected);

        mockMvc.perform(MockMvcRequestBuilders.get("/v2/auth/aws/iam/roles")
                .header("vault-token", "5PDrOhsy4ig8L3EpsJZSLAMg")
                .header("Content-Type", "application/json;charset=UTF-8"))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString(responseMessage)));
    }

    @Test
    public void test_deleteIAMRole() throws Exception {
        String responseMessage ="{\"messages\":[\"IAM Role deleted \"]}";
        ResponseEntity<String> responseEntityExpected = ResponseEntity.status(HttpStatus.OK).body(responseMessage);

        when(awsiamAuthService.deleteIAMRole(Mockito.eq("5PDrOhsy4ig8L3EpsJZSLAMg"),Mockito.any())).thenReturn(responseEntityExpected);

        mockMvc.perform(MockMvcRequestBuilders.delete("/v2/auth/aws/iam/roles/role1")
                .header("vault-token", "5PDrOhsy4ig8L3EpsJZSLAMg")
                .header("Content-Type", "application/json;charset=UTF-8"))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString(responseMessage)));
    }
}
