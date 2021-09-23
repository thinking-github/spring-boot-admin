package de.codecentric.boot.admin.config;

import java.util.ArrayList;
import java.util.List;

/**
 * @author thinking
 * @version 1.0
 * @since 2019-09-27
 */
public class ApplicationProperties {

    /**
     * The "includes applications" property name. 管理需要监控的应用列表 不区分大小写
     */
    private List<String> include = new ArrayList<String>();


    public List<String> getInclude() {
        return include;
    }

    public void setInclude(List<String> include) {
        this.include = include;
    }
}
