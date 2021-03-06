/**
 * Created by Yannick Lacaute on 17/05/17.
 * Copyright 2015-2016 the original author or authors.
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.thorpora.ezdashing.jira;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.URISyntaxException;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "jira")
public class JiraProperties {

    /**
     * Sample : "http://localhost:9000"
     */
    private String baseUrl;

    private String userName;

    private String password;

    public URI getJiraURI() {
        try {
            return new URI(baseUrl);
        } catch (URISyntaxException ex) {
            throw new JiraException("Jira baseUrl is invalid", ex);
        }
    }
}
